/* eslint-disable no-console */
const Dockerode = require('dockerode');
const chalk = require('chalk');

const { rootDirectory } = require('../../helpers');

class Docker {
  constructor(name, ...parameters) {
    this.dockerode = new Dockerode(...parameters);
    this.name = name || 'xui-backstop';
  }

  async buildImage() {
    const imageId = await this.getImageId();

    if (imageId !== undefined) {
      return;
    }

    console.log(chalk.blue('[Docker]'), 'Building image');

    const imageStream = await this.dockerode.buildImage(
      {
        context: rootDirectory,
        Cmd: ['/bin/bash'],
        src: ['Dockerfile'],
      },
      {
        t: this.name,
      },
    );

    await new Promise((resolve, reject) => {
      this.dockerode.modem.followProgress(imageStream, (err, res) =>
        err ? reject(err) : resolve(res),
      );
    });
  }

  async createContainer() {
    const container = await this.getContainer();
    if (container) {
      return container;
    }

    console.log(chalk.blue('[Docker]'), 'Creating container');

    return await this.dockerode.createContainer({
      Binds: [rootDirectory + ':/usr/src/app'],
      Image: this.name,
      name: this.name,
      Volumes: {
        '/usr/src/app': {},
      },
      Tty: true,
    });
  }

  async exec(command) {
    const container = await this.getContainer();
    if (container) {
      const exec = await container.exec({
        Cmd: command,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
      });

      const execStream = await exec.start();

      container.modem.demuxStream(execStream, process.stdout, process.stderr);

      await new Promise((resolve, reject) => {
        execStream.on('end', () => {
          resolve();
        });

        execStream.on('error', error => {
          reject();
        });
      });
    }
  }

  async getContainerId() {
    const containers = await this.dockerode.listContainers({ all: true });
    const container = containers.find(container => container.Names.includes('/xui-backstop'));
    return container ? container.Id : undefined;
  }

  async getContainer() {
    const containerId = await this.getContainerId();
    if (containerId) {
      return await this.dockerode.getContainer(containerId);
    }
    return;
  }

  async getImageId() {
    const images = await this.dockerode.listImages({ all: true });
    const image = images.find(image => image.RepoTags.includes('xui-backstop:latest'));
    return image ? image.Id : undefined;
  }

  async getImage() {
    const imageId = await this.getImageId();
    if (imageId) {
      return await this.dockerode.getImage(imageId);
    }
    return;
  }

  async ping() {
    try {
      await this.dockerode.ping();
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw chalk.red('Failed to connect to Docker');
      }
      throw error;
    }
  }

  async startContainer() {
    const container = await this.getContainer();
    if (container) {
      console.log(chalk.blue('[Docker]'), 'Starting container');
      try {
        await container.start();
      } catch (error) {
        if (error.statusCode !== 304) {
          throw error;
        }
        await this.stopContainer();
        await this.startContainer();
      }
    }
  }

  async stopContainer() {
    const container = await this.getContainer();
    if (container) {
      console.log(chalk.blue('[Docker]'), 'Stopping container');
      try {
        await container.stop();
      } catch (error) {
        if (error.statusCode !== 304) {
          throw error;
        }
      }
    }
  }

  async removeContainer() {
    const container = await this.getContainer();
    if (container) {
      console.log(chalk.blue('[Docker]'), 'Removing previous container');
      try {
        await container.stop();
      } catch (error) {
        if (error.statusCode !== 304) {
          throw error;
        }
      }
      await container.remove();
    }
  }

  async removeImage() {
    const image = await this.getImage();
    if (image) {
      console.log(chalk.blue('[Docker]'), 'Removing previous image');
      await image.remove();
    }
  }
}

module.exports = Docker;

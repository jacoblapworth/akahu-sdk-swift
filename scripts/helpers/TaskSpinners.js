const chalk = require('chalk');
const logUpdate = require('log-update');
const { argv } = require('yargs');

const verbose = Boolean(argv.verbose);
const CI = process.env.CI;

class TaskSpinners {
  constructor() {
    this.logs = [];
    this.warnings = [];
    this.errors = [];
    this.tasks = [];
    this.timeoutId;

    this.addLog = this.addLog.bind(this);
    this.addTask = this.addTask.bind(this);
    this.render = this.render.bind(this);

    this.render();
  }

  addLog(...messages) {
    const message = messages.join(' ');
    message &&
      this.logs.push({
        created: Number(new Date()),
        message,
      });
    this.render();

    if (CI) {
      console.log(message);
    }
  }

  addWarning(...messages) {
    const message = messages.join(' ');

    message &&
      this.warnings.push({
        created: Number(new Date()),
        message,
      });
    this.render();

    if (CI) {
      console.warn(message);
    }
  }

  addError(...messages) {
    const message = messages.join(' ');

    message &&
      this.errors.push({
        created: Number(new Date()),
        message,
      });
    this.render();

    if (CI) {
      console.error(message);
    }
  }

  addTask(title) {
    const taskSpinner = new TaskSpinner(this, title);
    this.tasks.push(taskSpinner);
    this.render();

    if (CI) {
      console.log(title);
    }

    return taskSpinner;
  }

  render() {
    clearTimeout(this.timeoutId);

    if (CI) {
      return;
    }

    const progressIndicators = {
      fail: chalk.red.bold('✖'),
      succeed: chalk.green.bold('✔'),
      spinning: chalk.blueBright.bold(
        ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'][
          Math.floor((Date.now() / 1000) * 10) % 10
        ],
      ),
    };

    const tasks = this.tasks.map(task => {
      const progressIndicator = progressIndicators[task.status];
      const lastDetail = task.details[task.details.length - 1];

      const details = verbose
        ? task.details.map(detail => `  ↳ ${chalk.gray(detail)}`)
        : task.status !== 'succeed' && lastDetail
        ? [`  ↳ ${(task.status === 'fail' ? chalk.red : chalk.gray)(lastDetail)}`]
        : [];

      return {
        created: task.created,
        message: [`${progressIndicator} ${task.title}`, ...details]
          .filter(message => message)
          .join(`\n`),
      };
    });

    logUpdate(
      [
        ...tasks,
        ...this.logs.map(log => ({ ...log, message: log.message })),
        ...this.warnings.map(warning => ({
          ...warning,
          message: chalk.yellow(warning.message),
        })),
        ...this.errors.map(error => ({ ...error, message: chalk.red(error.message) })),
      ]
        .sort((a, b) => a.created - b.created)
        .map(log => log.message)
        .join(`\n`),
    );

    if (!this.tasks.find(task => task.status === 'spinning')) {
      this.logs = [];
      this.warnings = [];
      this.errors = [];
      this.tasks = [];
      logUpdate.done();
      return;
    }

    this.timeoutId = setTimeout(() => this.render(), 80);
  }
}

class TaskSpinner {
  constructor(taskSpinners, title) {
    this.created = Number(new Date());
    this.details = [];
    this.status = 'spinning';
    this.taskSpinners = taskSpinners;
    this.title = title;
  }

  fail(error) {
    this.status = 'fail';
    this.details.push(error);
    this.taskSpinners.render();
  }

  info(info) {
    typeof info === 'string' && info && this.details.push(info);
    this.taskSpinners.render();

    if (CI) {
      console.log(info);
    }
  }

  succeed(title) {
    this.title = title;
    this.status = 'succeed';
    this.taskSpinners.render();

    if (CI) {
      console.log(title);
    }
  }

  warn(warning) {
    this.taskSpinners.addWarning(warning);

    if (CI) {
      console.warn(warning);
    }
  }
}

module.exports = TaskSpinners;

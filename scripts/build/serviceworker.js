#!/usr/bin/env node
const path = require('path');
const { generateSW } = require('workbox-build');
const { version: cacheId } = require('../../package.json');
const {
  rootDirectory,
  taskRunner,
  taskRunnerReturns: { succeed, fail },
} = require('../helpers');

const { SERVICE_WORKER = 'false' } = process.env;
const isServiceWorker = SERVICE_WORKER === 'true';
const globDirectory = path.resolve(rootDirectory, 'dist', 'docs');
const swDest = path.resolve(rootDirectory, 'dist', 'docs', 'sw.js');

const createBuildStep = () =>
  taskRunner(async taskSpinner => {
    taskSpinner.info(`Generating service worker against ID ${cacheId}`);
    try {
      await generateSW({
        cacheId,
        swDest,
        globDirectory,
        globPatterns: ['**/*.{html,json,js,css}'],
        globIgnores: ['versionSelector?(.*).js'],
        runtimeCaching: [
          {
            urlPattern: new RegExp('.(png|jpg|jpeg|svg)$'),
            handler: 'CacheFirst',
          },
          {
            urlPattern: new RegExp(
              '^https://(edge.xero.com|cdnjs.cloudflare.com|cdn.polyfill.io|cdn.rawgit.com)/',
            ),
            handler: 'NetworkFirst',
          },
        ],
      });

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);

const skipBuildStep = () =>
  taskRunner(
    () =>
      Promise.resolve({ stdout: `Skipping service worker creation (SERVICE_WORKER !== 'true')` }),
    __filename,
  );

module.exports = isServiceWorker ? createBuildStep : skipBuildStep;

require('make-runnable/custom')({
  printOutputFrame: false,
});

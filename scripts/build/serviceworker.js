#!/usr/bin/env node
const path = require('path');
const { version: cacheId } = require('../../package.json');
const { generateSW } = require('workbox-build');
const { rootDirectory, taskRunner } = require('../helpers');
const { SERVICE_WORKER = 'false' } = process.env;
const isServiceWorker = SERVICE_WORKER === 'true';
const globDirectory = path.resolve(rootDirectory, 'dist', 'docs');
const swDest = path.resolve(rootDirectory, 'dist', 'docs', 'sw.js');

const createBuildStep = () =>
  taskRunner(taskSpinner => {
    taskSpinner.info(`Generating service worker against ID ${cacheId}`);
    return generateSW({
      cacheId,
      swDest,
      globDirectory,
      globPatterns: ['**/*.{html,json,js,css}'],
      globIgnores: ['versionSelector?(.*).js'],
      runtimeCaching: [
        {
          urlPattern: new RegExp('.(png|jpg|jpeg|svg)$'),
          handler: 'cacheFirst',
        },
        {
          urlPattern: new RegExp(
            '^https://(edge.xero.com|cdnjs.cloudflare.com|cdn.polyfill.io|cdn.rawgit.com)/',
          ),
          handler: 'networkFirst',
        },
      ],
    });
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

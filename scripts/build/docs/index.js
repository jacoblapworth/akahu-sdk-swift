const { execSync } = require('child_process');
const fs = require('fs-extra');
const rimraf = require('rimraf').sync;
const path = require('path');

const xuiDocsVersion = require('./private/xuiDocsVersion');
const build = require('..');
const generateTags = require('./generateTags');
const addVersionSelector = require('./addVersionSelector');
const deleteLiveReload = require('./deleteLiveReload');

const { taskRunner, taskRunnerReturns } = require('../../helpers');

const { succeed, fail } = taskRunnerReturns;

function docsBuild() {
  return taskRunner(async taskSpinner => {
    try {
      // Clean up
      if (fs.existsSync(path.join('dist', 'docs'))) {
        rimraf(path.join('dist', 'docs'));
      }

      // Build documentation
      taskSpinner.info(`Building documentation for XUI ${xuiDocsVersion}`);
      await build();

      taskSpinner.info(`Moving built documentation to dist/docs/${xuiDocsVersion}/`);
      fs.renameSync(path.join('dist', 'docs'), path.join('dist', `tmp_${xuiDocsVersion}`));
      fs.moveSync(
        path.join('dist', `tmp_${xuiDocsVersion}`),
        path.join('dist', 'docs', xuiDocsVersion),
      );
      taskSpinner.info(`Copying favicon.ico to dist/docs/`);
      fs.copySync(
        path.join('src', 'versionSelector', 'favicon.ico'),
        path.join('dist', 'docs', 'favicon.ico'),
      );
      taskSpinner.info(`Copying meta.png to dist/docs/`);
      fs.copyFileSync(
        path.join('src', 'versionSelector', 'meta.png'),
        path.join('dist', 'docs', 'meta.png'),
      );
      taskSpinner.info(`Copying error.html to dist/docs/`);
      fs.copyFileSync(
        path.join('src', 'versionSelector', 'error.html'),
        path.join('dist', 'docs', 'error.html'),
      );

      // Generate tags.json
      taskSpinner.info('Generating tags.json');
      await generateTags();

      // Add version selector
      taskSpinner.info('Adding the version selector JS and CSS files to the sites markup');
      await addVersionSelector();

      // Remove live reload scripts
      taskSpinner.info('Removing live reload scripts');
      await deleteLiveReload();

      return succeed();
    } catch (error) {
      return fail(error);
    }
  }, __filename);
}

module.exports = docsBuild;
require('make-runnable/custom')({
  printOutputFrame: false,
});

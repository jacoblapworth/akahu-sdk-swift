/* eslint-disable no-console */
const gaze = require('gaze');
const buildKss = require('../build/kss.js');
const { logTaskTitle } = require('../helpers');
const chalk = require('chalk');
const lrserver = require('tiny-lr')();

const watchPaths = [
  'src/sass/**/*',
  '!src/sass/tmp/*',
  'src/docs/**/*',
  '.kss/**/*',
  'scripts/build/kss/config.json',
];

lrserver.listen(35729, err =>
  console.log(chalk.magentaBright('LR Server Started'), err ? err : ''),
);

gaze(watchPaths, (err, watcher) => {
  logTaskTitle(__filename);

  // On changed/added/deleted
  watcher.on('all', async (event, filepath) => {
    if (filepath === '') {
      return;
    }

    await buildKss();
    lrserver.changed({ body: { files: [filepath] } });
  });
});

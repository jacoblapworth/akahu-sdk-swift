/* eslint-disable no-console */
const gaze = require('gaze');
const buildKss = require('../build/kss.js');
const { logTaskTitle } = require('../helpers');
const lrserver = require('tiny-lr')();

const watchPaths = [
  'src/sass/**/*',
  '!src/sass/tmp/*',
  'src/docs/**/*',
  '.kss/**/*',
  'scripts/build/kss/config.json',
];

lrserver.listen(35729, err => console.log('LR Server Started', err ? err : ''));

gaze(watchPaths, (err, watcher) => {
  logTaskTitle(__filename);

  // On changed/added/deleted
  watcher.on('all', (event, filepath) => {
    if (filepath === '') {
      return;
    }

    buildKss().then(() => lrserver.changed({ body: { files: [filepath] } }));
  });
});

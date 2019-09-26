const gaze = require('gaze');
const buildStyleguide = require('../build/styleguidist');
const { logTaskTitle } = require('../helpers');

const watchPaths = ['src/sass/**/*', '!src/sass/tmp/*', 'src/react/**/*'];

gaze(watchPaths, (err, watcher) => {
  logTaskTitle(__filename);

  // On changed/added/deleted
  watcher.on('all', (event, filepath) => {
    if (filepath === '') {
      return;
    }
    buildStyleguide();
  });
});

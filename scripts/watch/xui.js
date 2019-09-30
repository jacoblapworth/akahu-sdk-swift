const gaze = require('gaze');
const postcssXui = require('../build/postcss/xui');
const { logTaskTitle } = require('../helpers');

const watchPaths = ['src/sass/*', '!src/sass/tmp/*'];

gaze(watchPaths, (err, watcher) => {
  logTaskTitle(__filename);

  // On changed/added/deleted
  watcher.on('all', (event, filepath) => {
    if (filepath === '') {
      return;
    }

    if (/.\.scss$/.test(filepath)) {
      postcssXui();
    }
  });
});

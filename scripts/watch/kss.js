const gaze = require('gaze');
const buildKss = require('../build/kss');
const { logTaskTitle } = require('../helpers');

gaze('kss/**/*', (err, watcher) => {
	logTaskTitle(__filename);

	// On changed/added/deleted
	watcher.on('all', (event, filepath) => {
		if (filepath === '') {
			return;
		}

		buildKss();
	});
});

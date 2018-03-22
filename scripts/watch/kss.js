const gaze = require('gaze');
const buildKss = require('../build/kss');
const { logTaskTitle } = require('../helpers');

const watchPaths = [
	'src/sass/**/*',
	'src/docs/**/*',
	'.kss/**/*',
	'scripts/build/kss/config.json'
];

gaze(watchPaths, (err, watcher) => {
	logTaskTitle(__filename);

	// On changed/added/deleted
	watcher.on('all', (event, filepath) => {
		if (filepath === '') {
			return;
		}

		buildKss();
	});
});

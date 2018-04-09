const spawn = require('cross-spawn');
const path = require('path');
const { rootDirectory, logTaskTitle } = require('../helpers');

const buildKss = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'kss'
));
const cssMinXui = require(path.resolve(
	rootDirectory,
	'scripts',
	'build',
	'cssmin'
));

const watch = path.resolve(rootDirectory, 'scripts', 'watch', 'all');
const storybook = path.resolve(
	rootDirectory,
	'scripts',
	'storybook',
	'index.js'
);

function watchBoth() {
	logTaskTitle(__filename);

	Promise.all([[buildKss(), cssMinXui()]]).then(() => {
		[watch, storybook].forEach(watcher => {
			const childProcess = spawn('node', [watcher], { stdio: 'inherit' });
			childProcess.on('data', data => {
				console.log(data); //eslint-disable-line no-console
			});
		});
	});

	return '';
}

module.exports = watchBoth;
require('make-runnable/custom')({ printOutputFrame: false });

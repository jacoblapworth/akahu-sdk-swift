const spawn = require('cross-spawn');
const path = require('path');
const { rootDirectory, logTaskTitle } = require('../helpers');

const kss = path.resolve(rootDirectory, 'scripts', 'watch', 'kss');
const xui = path.resolve(rootDirectory, 'scripts', 'watch', 'xui');
const styleguide = path.resolve(
	rootDirectory,
	'scripts',
	'watch',
	'styleguide'
);

function watchBoth() {
	logTaskTitle(__filename);

	[kss, xui, styleguide].forEach(watcher => {
		const childProcess = spawn('node', [watcher], { stdio: 'inherit' });
		childProcess.on('data', data => {
			console.log(data); //eslint-disable-line no-console
		});
	});

	return '';
}

module.exports = watchBoth;
require('make-runnable/custom')({ printOutputFrame: false });

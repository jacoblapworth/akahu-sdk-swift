const spawn = require('cross-spawn');
const path = require('path');
const { promisify } = require('util');
const { rootDirectory, logTaskTitle } = require('../helpers');
const rimrafAsync = promisify(require('rimraf'));

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
const styleguideServer = path.resolve(
	rootDirectory,
	'scripts',
	'styleguide',
	'index.js'
);

// Styleguidist doesn't like "built files" as well as "dev server files"
// This change is required to keep developing nicely.
function removeDistDocsReact() {
	return rimrafAsync(path.resolve(rootDirectory, 'dist', 'docs', 'react'));
}

function watchBoth() {
	logTaskTitle(__filename);

	Promise.all([[buildKss(), cssMinXui(), removeDistDocsReact()]]).then(() => {
		[watch, storybook, styleguideServer].forEach(watcher => {
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

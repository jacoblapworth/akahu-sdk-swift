const path = require('path');
const ncp = require('ncp');
const { taskRunner, rootDirectory } = require('../helpers');
const babelBuild = require('../build/babel');
const codemodBuild = require('../codemod');

process.env.NODE_ENV = 'production';

const reactBuildOutputPath = path.join(rootDirectory, 'dist', 'react');
const reactMoveToLocation = path.join(rootDirectory, 'react');
const sassSourceLocation = path.join(rootDirectory, 'src', 'sass');
const sassMoveToLocation = path.join(rootDirectory, 'sass');
const codemodBuildOutputLocation = path.join(rootDirectory, 'dist', 'codemod');
const codemodMoveToLocation = path.join(rootDirectory, 'codemod');
const reactES6SourceLocation = path.join(rootDirectory, 'src', 'react');
const reactES6OutputLocation = path.join(rootDirectory, 'react-es6');

function prepack() {
	taskRunner(taskSpinner => {
		taskSpinner.info('Done with basic build promises');
		return Promise.all([
			babelBuild(),
			codemodBuild()
		])
		.then(({ stdout }) => console.log(stdout)) //eslint-disable-line no-console
		.then(() => {
			ncp(reactBuildOutputPath, reactMoveToLocation);
			ncp(sassSourceLocation, sassMoveToLocation);
			ncp(codemodBuildOutputLocation, codemodMoveToLocation);
			ncp(reactES6SourceLocation, reactES6OutputLocation);
		});
	}, __filename);
}

module.exports = prepack;
require('make-runnable/custom')({ printOutputFrame: false });

/* eslint-disable no-console */
const {
	rootDirectory,
	createFolderIfNotExists,
	taskRunner,
	taskRunnerReturns
} = require('../../helpers');
const path = require('path');
const doPostCss = require('./doPostCss');
const { succeed, fail } = taskRunnerReturns;

function allFiles() {
	const files = [
		path.resolve(rootDirectory, 'src', 'sass', '_vars.scss'),
		path.resolve(rootDirectory, 'src', 'sass', '_mixins.scss')
	];

	return taskRunner(() => {
		return createFolderIfNotExists(
			path.resolve(rootDirectory, 'dist', 'tokens')
		)
			.then(
				() =>
					new Promise(resolve => {
						resolve(
							files.forEach(file => {
								doPostCss({
									inputFile: file,
									processors: [
										require('postcss-easy-import')({
											prefix: '_',
											extensions: '.scss'
										}),
										require('postcss-discard-comments')
									],
									syntax: require('postcss-scss'),
									dest: path.resolve(
										rootDirectory,
										'dist',
										'tokens',
										'tokens.scss'
									)
								});
							})
						);
					})
			)
			.then(succeed)
			.catch(fail);
	}, __filename);
}

module.exports = allFiles;
require('make-runnable/custom')({
	printOutputFrame: false
});

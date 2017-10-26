/* eslint-env node */
module.exports = function (grunt) {
	const nopt = require('nopt');
	const knownOpts = {
		livereload: [Number, Boolean, null]
	};
	const shortHands = {
		lr: ['--livereload']
	};
	const opts = nopt(knownOpts, shortHands, process.argv, 2);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadNpmTasks('grunt-git');

	require('load-grunt-tasks')(grunt);
	require('load-grunt-config')(grunt, {
		configPath: require('path').join(process.cwd(), 'build/grunt'),
		data: opts
	});

	grunt.registerTask('build', ['sass', 'postcss:dist']);
	grunt.registerTask('dist', ['cssmin']);
	grunt.registerTask('doc', ['if:readme', 'kss']);
	grunt.registerTask('kss', ['shell:kss', 'postcss:styleguide', 'copy:xui']);

	const gitOperations = ['gitadd', 'gitcommit', 'gitpush'];
	grunt.registerTask('gh-pages', gitOperations.map(name => name + ':styleguide'));

	grunt.registerTask('doiuse', 'Task to run doiuse', function () {
		const postcss = require('postcss');
		const doiuse = require('doiuse');
		const done = this.async();
		const browsers = require('@xero/browserslist-autoprefixer');
		const selectorArray = [];
		let count = 0;

		postcss(doiuse({
			browsers,
			ignore: [
				'css-appearance',
				'css-resize',
				'viewport-units',
				'font-feature'
			],
			onFeatureUsage: function (usageInfo) {
				if (usageInfo.feature === 'flexbox') {
					if (!selectorArray.includes(usageInfo.usage.parent.selector)) {
						grunt.log.warn(`The selector ${usageInfo.usage.parent.selector} uses flexbox which has partial support in IE11, please ensure you test any changes in IE11`);
						selectorArray.push(usageInfo.usage.parent.selector);
					}
				} else {
					grunt.log.error(usageInfo.message);
					count++;
				}
			}
		}))
		.process(grunt.file.read('./dist/xui.css'), 'utf8')
		.catch(reason => {
			grunt.log.error(reason);
			done(false);
		})
		.then(() => done(count === 0));
	});
};

/*eslint-env node */
module.exports = function (grunt) {
	'use strict';

	var nopt = require('nopt');
	var knownOpts = {
		'livereload': [Number, Boolean, null]
	};
	var shortHands = {
		'lr': ['--livereload']
	};
	var opts = nopt(knownOpts, shortHands, process.argv, 2);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadNpmTasks('grunt-git');

	require('load-grunt-tasks')(grunt);
	require('load-grunt-config')(grunt, {
		configPath: require('path').join(process.cwd(), 'build/grunt'),
		data: opts
	});

	grunt.registerTask('install', ['bower-install-simple', 'shell:install']);
	grunt.registerTask('lint', ['scsslint', 'build', 'doiuse']);
	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('dist', ['cssmin']);
	grunt.registerTask('doc', ['readme', 'template', 'kss']);

	grunt.registerTask('kss', ['shell:kss']);

	var gitOperations = ['gitadd', 'gitcommit', 'gitpush'];

	grunt.registerTask('gh-pages', gitOperations.map(function (name) {
		return name + ':styleguide';
	}));

	grunt.registerTask('master', gitOperations.slice(0, 2).map(function (name) {
		return name + ':readme';
	}));

	grunt.registerTask('readme', 'Update version number in README.md', function () {
		var filepath = 'README.md';
		var re = /(https:\/\/edge.xero.com\/style\/xui\/)(\d+.\d+.\d+)(\/xui.css)/g;
		var options = { encoding: 'utf8' };
		var packageJson = require('./package.json');
		var originalContents = grunt.file.read(filepath, options);

		var newContents = originalContents.replace(re, function () {
				return arguments[1] + packageJson.version + arguments[3];
		});

		if (newContents !== originalContents) {
			grunt.file.write(filepath, newContents, options);
		}
	});

	grunt.registerTask('doiuse', 'Task to run doiuse', function () {
		var postcss = require('postcss');
		var doiuse = require('doiuse');
		var fs = require('fs');
		var os = require('os');
		var done = this.async();

		fs.readFile('browserslist', { encoding: 'utf8' }, function (err, data) {
			if (err) {
				throw err;
			}

			var browsers = data.split(os.EOL).filter(function (browser) {
				return browser && typeof browser === 'string';
			});

			var count = 0;

			postcss(doiuse({
				browsers: browsers,
				ignore: [
					'css-appearance',
					'css-resize',
					'viewport-units'
				],
				onFeatureUsage: function(usageInfo) {
					grunt.log.error(usageInfo.message);
					count++;
				}
			}))
			.process(grunt.file.read('./dist/xui.css'), 'utf8')
			.catch(function (reason) {
				grunt.log.error(reason);
				done(false);
			})
			.then(function () {
				done(count === 0);
			});
		});
	});
};

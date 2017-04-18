/*eslint-env node */
var path = require('path');

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

	grunt.registerTask('search-index', function () {
		var done = this.async();
		var src = path.join(__dirname, 'docs');
		var dest = path.join(__dirname, 'docs/');
		require('static-search-indexer').buildIndex(src, dest, `https://github.dev.xero.com/pages/UXE/xui/#${require('./package.json').version}/`, () => done());
	});

	grunt.registerTask('build', ['sass', 'autoprefixer:dist']);
	grunt.registerTask('dist', ['cssmin']);
	grunt.registerTask('doc', ['if:readme', 'kss', 'copy:xui', 'babel:search', 'search-index']);
	grunt.registerTask('kss', ['shell:kss', 'autoprefixer:styleguide']);

	var gitOperations = ['gitadd', 'gitcommit', 'gitpush'];

	grunt.registerTask('gh-pages', gitOperations.map(function (name) {
		return name + ':styleguide';
	}));

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
			var selectorArray = [];

			postcss(doiuse({
				browsers: browsers,
				ignore: [
					'css-appearance',
					'css-resize',
					'viewport-units',
					'font-feature'
				],
				onFeatureUsage: function(usageInfo) {
					if (usageInfo.feature === 'flexbox'){
						var found = selectorArray.find(function(selector){
							return selector === usageInfo.usage.parent.selector;
						});
						if (!found) {
							grunt.log.warn('The selector', usageInfo.usage.parent.selector, 'uses flexbox which has partial support in IE11, please ensure you test any changes in IE11');
							selectorArray[selectorArray.length]=usageInfo.usage.parent.selector;
						}
					} else {
						grunt.log.error(usageInfo.message);
						count++;
					}
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

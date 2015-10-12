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
	grunt.registerTask('lint', ['scsslint']);
	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('dist', ['cssmin']);
	grunt.registerTask('doc', ['template', 'kss:styleguide']);

	grunt.registerTask('bump:major', ['shell:bump-major']);

	grunt.registerTask('gh-pages', ['gitadd', 'gitcommit', 'gitpush'].map(function (name) {
		return name + ':styleguide';
	}));
};

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.loadNpmTasks('grunt-git');

	require('load-grunt-tasks')(grunt);
	require('load-grunt-config')(grunt, {
		configPath: require('path').join(process.cwd(), 'build/grunt')
	});

	grunt.registerTask('install', ['bower-install-simple', 'shell:install']);
	grunt.registerTask('lint', ['scsslint']);
	grunt.registerTask('build', ['sass', 'autoprefixer']);
	grunt.registerTask('dist', ['cssmin']);

	grunt.registerTask('gh-pages', ['gitadd', 'gitcommit', 'gitpush'].map(function (name) {
		return name + ':styleguide';
	}));
};

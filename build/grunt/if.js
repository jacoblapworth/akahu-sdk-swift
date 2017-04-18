var path = require('path');
var gitOperations = ['gitadd', 'gitcommit', 'gitpush'];

module.exports = function(grunt) {
	return {
		readme: {
			options: {
				test: function() {
					var filepath = 'README.md';

					var edgeRegex = /(http[s]?:\/\/edge.xero.com\/style\/xui\/)(\d+.\d+.\d+[^\/]*)(\/\w+.*\w*?)/g;
					var githubRegex = /(git(@|:\/\/)github\.dev\.xero\.com(\/|:)UXE\/xui\.git#\^?)(\d+.\d+.\d+[^\/^ ]*)(.*)/g;

					var options = { encoding: 'utf8' };
					var packageJson = require('../../package.json');

					var originalContents = grunt.file.read(filepath, options);

					var newContents = originalContents.replace(edgeRegex, function () {
						return arguments[1] + packageJson.version + arguments[3];
					}).replace(githubRegex, function() {
						return arguments[1] + packageJson.version + arguments[5];
					});

					if (newContents !== originalContents) {
						grunt.file.write(filepath, newContents, options);
						return true;
					} else {
						grunt.log.writeln('No change to README.md required as the version has not changed');
						return false;
					}
				}
			},
			ifTrue: gitOperations.map(function(name) {
				return name + ':readme';
			}),
			ifFalse: []
		}
	}
};

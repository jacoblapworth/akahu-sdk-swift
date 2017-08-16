module.exports = function(grunt, opts) {
	return {
		options: {
			livereload: !!opts.livereload
		},
		files: ['src/**/*', 'kss/**/*'],
		tasks: ['build', 'kss']
	}
};

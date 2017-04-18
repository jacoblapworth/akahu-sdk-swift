module.exports = function(grunt, opts) {
	return {
		options: {
			livereload: !!opts.livereload
		},
		files: ['src/**/*'],
		tasks: ['build', 'kss', 'doc']
	}
};

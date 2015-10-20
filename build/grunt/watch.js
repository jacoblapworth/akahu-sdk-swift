module.exports = function(grunt, opts) {
	var livereload;

	if(opts.livereload === 1) {
		livereload = true;
	}
	else if(opts.livereload === 0) {
		livereload = false;
	}
	// allows for setting an explicit port, otherwise defaults to 35729
	else {
		livereload = opts.livereload;
	}

	return {
		options: {
			livereload: livereload
		},
		files: ['**/*.scss', 'template/*'],
		tasks: ['lint', 'build', 'kss']
	}
};
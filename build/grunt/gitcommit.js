module.exports = {
	styleguide: {
		options: {
			allowEmpty: true,
			message: 'Update styleguide'
		},
		files: {
			src: [
				'dist/*',
				'styleguide/*',
				'./*.html'
			]
		}
	}
};

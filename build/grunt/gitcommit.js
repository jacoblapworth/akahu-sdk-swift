module.exports = {
	readme: {
		options: {
			allowEmpty: true,
			message: 'Update README'
		},
		files: {
			src: [
				'./README.md'
			]
		}
	},

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

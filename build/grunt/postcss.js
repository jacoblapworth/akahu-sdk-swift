module.exports = {
	options: {
		syntax: require('postcss-scss'),
		processors: [
			require('postcss-easy-import')({prefix: '_', extensions: '.scss'}),
			require('postcss-discard-comments')
		]
	},
	dist: {
		src: ['src/sass/_vars.scss', 'src/sass/_mixins.scss'],
		dest: 'dist/tokens.scss'
	}
};

const browsers = require('@xero/browserslist-autoprefixer');
const autoprefixer = require('autoprefixer');
module.exports = {
	tokens: {
		options: {
			syntax: require('postcss-scss'),
			processors: [
				require('postcss-easy-import')({prefix: '_', extensions: '.scss'}),
				require('postcss-discard-comments')
			]
		},
		src: ['src/sass/_vars.scss', 'src/sass/_mixins.scss'],
		dest: 'dist/tokens.scss'
	},
	dist: {
		options: {
			map: true,
			processors: [
				autoprefixer({ browsers })
			]
		},
		src: './dist/xui.css'
	},
	styleguide: {
		options: {
			map: true,
			processors: [
				autoprefixer({ browsers })
			]
		},
		src: './docs/style.css'
	}
};

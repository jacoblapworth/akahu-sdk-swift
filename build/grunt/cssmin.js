module.exports = {
	options: {
		shorthandCompacting: false,
		roundingPrecision: -1,
		sourceMap: true
	},
	target: {
		files: {
			'dist/xui.min.css': ['dist/xui.css']
		}
	}
};

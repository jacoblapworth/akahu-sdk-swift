module.exports = {
	module: {
			rules: [{
					test: /\.md$/,
					use: "raw-loader"
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
			  }	
		]
	}
};

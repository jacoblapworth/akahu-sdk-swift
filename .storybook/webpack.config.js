module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				exclude: [
					/node_modules/,
				],
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: [
							[
								"@babel/plugin-proposal-class-properties",
								{
									loose: true
								}
							]
						]
					}
				},
				test: /\.jsx?$/,
			}
		],
	}
};

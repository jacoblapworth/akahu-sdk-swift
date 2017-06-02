const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: ['es2015', 'react','jest'],
	plugins: ['transform-object-rest-spread'],
});

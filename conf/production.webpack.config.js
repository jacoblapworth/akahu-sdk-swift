var path = require('path');
module.exports = require(path.resolve(__dirname, 'make-webpack.config.js'))({
	production: true
});

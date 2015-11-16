var path = require('path');
module.exports = function (config) {
	config.set(require(path.resolve(__dirname, 'make-karma.config.js'))());
};

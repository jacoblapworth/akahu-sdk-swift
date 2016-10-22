const version = require('../../../package.json').version;
module.exports = function(handlebars) {

	handlebars.registerHelper('version', function() {
		// Returns XUI version as per package.json
		return new handlebars.SafeString(version);
	});
}

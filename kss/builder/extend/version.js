const version = require('../../../package.json').version;
const iconVersion = require('../../../node_modules/@xero/xui-icon/package.json').version;
const xuiIcon = `https://edge.xero.com/style/xui-icon/${iconVersion}`
const xuiIconBlob = `${xuiIcon}/xuiIconBlobES5.js`

module.exports = function(handlebars) {

	handlebars.registerHelper('version', function() {
		// Returns XUI version as per package.json
		return new handlebars.SafeString(version);
	});

	handlebars.registerHelper('xuiIconDocs', function() {
		// Injects newest version of XUI Icon Docs
		return new handlebars.SafeString(`<script src="${xuiIcon}/xuiIconsDocs.js"></script>`);
	});

	handlebars.registerHelper('xuiIconBlob', function() {
		// Injects newest version of XUI Icon Blob
		return new handlebars.SafeString(`<script src="${xuiIconBlob}"></script>`);
	});

	handlebars.registerHelper('injectXuiIconBlobExample', function() {
		this.description = this.description.replace('@xuiIconBlobURL', `<code>&lt;script src=&quot;${xuiIconBlob}&quot;&gt;&lt;/script&gt;</code>`);
	});
}

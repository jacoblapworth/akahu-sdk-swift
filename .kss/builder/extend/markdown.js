'use strict';
/* eslint-env node */

/**
 * Registers the "includePage" Handlebars helper.
 *
 * @param {string} page name of a markdown file in src/pages
 * @param {object} handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */

var fs = require('fs');
var path = require('path');
var marked = require('../../../node_modules/marked');

module.exports = function(handlebars) {

	handlebars.registerHelper('includePage', function(pageName, options) {
		var pageHtml;
		var pagePath;

		if (!pageName) {
			return '';
		}

		pagePath = path.resolve(__dirname, '../../../src/docs/', pageName);

		if (fs.existsSync(pagePath)) {
			pageHtml = marked.parse(fs.readFileSync(pagePath, 'utf8'));
		}

		if (!pageHtml) { return '<!-- ' + pageName + ' could not be found. -->'; }

		return pageHtml;
	});
};

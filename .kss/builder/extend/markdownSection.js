'use strict';
/* eslint-env node */

var marked = require('marked');

module.exports = function(handlebars) {
	handlebars.registerHelper('renderSectionInMarkdown', function(text, options = {}) {
		// Render markdown for tips.details
		if (Array.isArray(text)) {
			return marked.inlineLexer(text[0] || '', []);
		}
		return marked(text, options);
	});
};
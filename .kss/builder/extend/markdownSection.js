'use strict';
/* eslint-env node */

var marked = require('marked');

module.exports = function(handlebars) {
	handlebars.registerHelper('renderSectionInMarkdown', function(text, options = {}) {
		return marked(text, options);
	});
};

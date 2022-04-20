'use strict';
/* eslint-env node */

var {marked} = require('marked');

module.exports = function(handlebars) {
	handlebars.registerHelper('renderSectionInMarkdown', function(text, options = {}) {
		// Render markdown for tips.details
		if (Array.isArray(text)) {
      return marked.parse(text[0] || '', (error, result) =>
        typeof result === 'string' ? result.replace(/<p>|<\/p>/g, '') : result
      );
		}
		return marked.parse(text, options);
	});
};

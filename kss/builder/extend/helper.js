'use strict';

module.exports = function(handlebars) {
	handlebars.registerHelper('test', function() {
		// Returns a string to test for.
		return new handlebars.SafeString('Handlebars helper loaded into template!');
	});

	/**
	 * Takes a range of numbers that the current section's depth must be within.
	 *
	 * Equivalent to "if the current section is X levels deep". e.g:
	 *
	 * {{#ifDepth 1}}
	 *    ROOT ELEMENTS ONLY
	 *   {{else}}
	 *    ANYTHING ELSE
	 * {{/ifDepth}}
	 */
	handlebars.registerHelper('ifDepth', function(lowerBound, upperBound, options) {
		// If only 1 parameter is passed, upper bound is the same as lower bound.
		if (typeof options === 'undefined' || options === null) {
			options = upperBound;
			upperBound = lowerBound;
		}
		return (this.depth && this.depth >= lowerBound && this.depth <= upperBound) ? options.fn(this) : options.inverse(this);
	});

	/**
	 * Compares two objects to see if they are the same. Currently used to check for the selected tab on the menu
	 *
	 * e.g.
	 * {{#isEqual object1 object2}}
	 * 		EXECUTE THIS IF EQUAL
	 * 		{{else}} [optional]
	 * 		WILL EXECUTE THIS
	 * {{/isEqual}}
	 */
	handlebars.registerHelper('isEqual', function(a, b, options) {
		return a === b  ? options.fn(this) : options.inverse(this);
	});

	/**
	 * Outputs console.log() debugging information for each parameter given.
	 *
	 * If no parameters are given, the entire context is output with
	 * `console.log(this)`.
	 */
	handlebars.registerHelper('consoleLog', function() {
		if (arguments.length > 1) {
			// 'options' is automatically passed as the last argument, so skip it.
			for (var i = 0; i < arguments.length - 1; i++) {
				console.log(arguments[i]);
			}
		} else {
			console.log('==================== Current Handlebars context:');
			console.log(this);
			console.log('====================');
		}
		return '';
	});

};

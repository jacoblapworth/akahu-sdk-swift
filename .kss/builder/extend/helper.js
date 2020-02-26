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
	 * Compares two objects to see if they're not the same. Shotcircuit for isEqual helper
	 *
	 * e.g.
	 * {{#isNotEqual object1 object2}}
	 * 		EXECUTE THIS IF NOT EQUAL
	 * 		{{else}} [optional]
	 * 		WILL EXECUTE THIS
	 * {{/isNotEqual}}
	 */
	handlebars.registerHelper('isNotEqual', function(a, b, options) {
		return a !== b  ? options.fn(this) : options.inverse(this);
	});

	/**
	 * convert string to a class friendly lowercased space free output
	 */

	handlebars.registerHelper("getStatusClass", function(input) {
		const stripped = input.toLowerCase().match(/[a-z\s]*/)[0].replace(/\s/g, "");
		return `ds-status--${stripped}`;
	});

  /**
	* Checks an item is included inside the list (array).
	*
	* e.g
	* {{#isInList item array}}
	*	  EXECUTE IF IT APPEARS IN ARRAY
	*	{{else}} [optional]
	* 	EXECUTE IF IT DOES
	* {{/isInList}}
	*
	*/
  handlebars.registerHelper("isInList", function(list, elem, options) {
    if (!list) return options.inverse(this);

    const found = list.split(" ").includes(elem);

    return found ? options.fn(this) : options.inverse(this);
  });

 /**
	* Checks an item isn't included inside the list (array).
	*
	* e.g
	* {{#isNotInList item array}}
	*	EXECUTE IF DOESN'T APPEAR IN ARRAY
	*	{{else}} [optional]
	* 	EXECUTE IF IT DOES
	* {{/isNotInList}}
	*
	*/
	handlebars.registerHelper('isNotInList', function(elem, menu, options) {
		var found = menu.find(function(menuItem){
			return menuItem.header === elem;
		});

		return found ? options.inverse(this): options.fn(this);
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

	/**
	 * Add {{debugger}} to a handlebars template or partial to enable debugging using node inspecting
	 */
	handlebars.registerHelper('debugger', function() {
		debugger;
	});

	/**
	 * Determines which the html prefixes and suffixes to wrap each of the sections
	 * - Sections of depth 3 or more should be nested in their parent section
	 *
	 * e.g.
	 * {{#wrapSection id}}
	 * 		if depth < 3 {
	 * 			closes previous section tag and opens a new the section tags
	 * 		} else {
	 * 			opens and closes section in a div.
	 * 		}
	 * {{/wrapSection}}
	 */
	handlebars.registerHelper('wrapSection', function (sectionId, body) {
		const depth = this.depth,
			isLast = body.data.last;

		var openSection = ``,
			closeSection = ``;

		if (depth < 3) {
			if (depth === 2) {
				openSection = `</section>`;
			}
			openSection += `<section id=${sectionId} class="kss-section--depth-${depth}">`;

		} else {
			openSection = `<div id=${sectionId} class="kss-section--depth-${depth}">`;
			closeSection = `</div>`;
		}

		if (isLast) {
			closeSection += `</section>`;
		}
		return openSection + body.fn(this) + closeSection;
	})


	/**
	 * Test against list of styleguides and evaluate if current matches
	 *
	 * e.g.
	 * {{#ifStyleguide "Styleguide ref1" "Styleguide ref2"}}
	 * 		WILL EXECUTE THIS
	 * 		{{else}} [optional]
	 * 		EXECUTE THIS IF NOT A MATCHING REFERENCE
	 * {{/ifStyleguide}}
	 */
	handlebars.registerHelper('ifStyleguide', function() {
		const styleguides = Array.from(arguments);
		const options = styleguides.splice( -1)[0];
		const matchesStyleguide = (styleguides.indexOf(this.reference) !== -1);
		return (matchesStyleguide) ? options.fn(this) : options.inverse(this);
	});
};

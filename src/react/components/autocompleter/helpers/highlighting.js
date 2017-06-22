import React from 'react';
import uuidv4 from 'uuid/v4';

/**
 *	Find all case-insensitive matches of a sub-string in a string and replace them with the output of decorateFn.
 *	For example, if you wanted to italicize all instances of 'ca' in 'Candy cane', you could:
 *	decorateSubStr('Candy cane', 'ca', (subStr) => (<i>{subStr}</i>)); // => [<i>Ca</i>, 'ndy ', <i>ca</i>, 'ne'];
 *
 * @public
 * @param {string} str - The string being searched
 * @param {string} searchStr - The sub-string which needs to be decorated
 * @param {function} decorateFn - Function which will map the string to whatever you want
 * @returns {Array.<string|JSX>|string}
 */
export const decorateSubStr = (str, searchStr, decorateFn)	=> {
	// If the search string is the same as the result, return a decorated full match
	if (str === searchStr) {
		//v1() creates a unique time based key
		return decorateFn(str, uuidv4());
	}

	// If there's no search string or its greater than a match there's no need to decorate in this case.
	if (!str || !searchStr || searchStr.length > str.length) {
		return str;
	}
	const matchRegex = new RegExp(searchStr, 'ig');
	const matches = str.match(matchRegex);
	if (!matches) {
		return str;
	}

	// Decorate matches by splitting 'str' using the matchRegex, creating an array which can contain
	// all string parts and matches, then merging the items in the split string with the decorated
	// matches.
	const splitString = str.split(matchRegex);
	let result = [];
	let resultIdx = 0;
	for (let i = 0; i < splitString.length; i++) {
		if (splitString[i]) {
			result[resultIdx++] = splitString[i];
		}
		if (matches[i]) {
			result[resultIdx++] = decorateFn(matches[i], uuidv4());
		}
	}
	return result;
};

/**
 * Decorator function that can be used with decorateSubStr to bold matching selections by wrapping them in a strong tag.
 *
 * @public
 * @param {string} str
 * @param {string} id
 *
 * @returns {React.Component}
 */
export const boldMatch = (str, id) => (<strong key={id}>{str}</strong>);

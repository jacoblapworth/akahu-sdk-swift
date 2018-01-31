import {colorClassNames} from './constants';

const ignoreChars = /[(){}[\]]/; // ignore braces

/**
 * @private
 * Gets the avatar color class based on the identifier
 * @param {String} identifier
 * @returns {String} The class name to use for the avatar's color
 */
function getAvatarColorClass(identifier) {

	if (identifier == null || typeof identifier !== 'string' || identifier.length < 1) {
		throw new Error('Please provide a string of length greater than 1');
	}

	let i;
	let c;
	let h = 5381;
	const len = identifier.length >>> 0;

	for (i = 0; i < len; i++) {
		c = identifier.charCodeAt(i);
		h = (((h << 5) + h) ^ c) >>> 0;
	}

	// The XUI class names are not zero-indexed
	const colorNumber = (h % colorClassNames.length);
	return colorClassNames[colorNumber];
}

/**
 * @private
 * Generate an abbreviation for an avatar based on its value. This takes the first character of each word
 * (non-whitespace, not brackets or one of the ignored characters, destructured for unicode handling)
 * @param {String} name The string to abbreviate
 * @param {Number} maxChars The max number of chars desired in the resulting abbreviation
 * @returns {String} The abbreviation
 */
function abbreviateAvatar(name, maxChars) {

	if (typeof name !== 'string') {
		throw new Error('Please provide a name');
	}

	let destructuredName = [...name];
	let lengthCounter = 0;
	let nextChar;
	let newName = '';
	let includeNextNonWhitespaceChar = true;

	for(let i = 0; (i < destructuredName.length && lengthCounter < maxChars); i++) {
		nextChar = destructuredName[i];

		if(/\s/.test(nextChar)) {
			includeNextNonWhitespaceChar = true;
		} else if(includeNextNonWhitespaceChar && !ignoreChars.test(nextChar)) {
			newName += nextChar.toLocaleUpperCase();
			includeNextNonWhitespaceChar = false;
			lengthCounter++;
		}
	}

	return newName;
}

export {
	getAvatarColorClass,
	abbreviateAvatar
}

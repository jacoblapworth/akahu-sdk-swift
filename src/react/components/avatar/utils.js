import { colorClassNames } from './constants';

// exclude selected characters from abbreviation
const ignoreChars = /[\u0021-\u002F\u003A-\u003F\u005B-\u0060\u007B-\u00BF]/g;

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

  /* eslint-disable no-bitwise */
  let i;
  let c;
  let h = 5381;
  const len = identifier.length >>> 0;

  for (i = 0; i < len; i += 1) {
    c = identifier.charCodeAt(i);
    h = (((h << 5) + h) ^ c) >>> 0;
  }

  // The XUI class names are not zero-indexed
  const colorNumber = h % colorClassNames.length;
  return colorClassNames[colorNumber];
  /* eslint-enable no-bitwise */
}

/**
 * @private
 * Generate an abbreviation for an avatar based on its value. This takes the
 * first character of each word (non-whitespace, not brackets or one of the
 * ignored characters, by codepoint for unicode handling)
 * @param {String} name The string to abbreviate
 * @param {Number} maxChars The max number of chars desired in the resulting abbreviation
 * @returns {String} The abbreviation
 */
function abbreviateAvatar(name, maxChars) {
  if (typeof name !== 'string') {
    throw new Error('Please provide a name');
  }

  let newName = '';
  const scrubbedName = name.replace(ignoreChars, '').trim();
  const words = scrubbedName.split(/\s+/);
  if (!words.length) {
    throw new Error('Please provide a name');
  }
  const l = Math.min(maxChars, words.length);
  for (let i = 0; i < l; i += 1) {
    const sortaChars = [...words[i]]; // 'sortaChars' because it's closer to codePoints
    if (!sortaChars[0]) {
      break;
    }
    newName += sortaChars[0].toLocaleUpperCase();
  }

  return newName;
}

export { getAvatarColorClass, abbreviateAvatar };

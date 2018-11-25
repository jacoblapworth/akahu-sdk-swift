
/**
 * @private
 * Calculates the max height for the textarea based off `maxRows`. Will default to the CSS value
 * if no `maxRows` is provided
 * @returns {Number} value of the max height in pixels
 */
export const calculateMaxHeight = ({ textArea, maxRows }) => {
	const textAreaStyle = window && window.getComputedStyle && window.getComputedStyle(textArea);
	if (maxRows && !textAreaStyle) {
		return maxRows * 15 * 1.5;
	}
	const lineHeight = textAreaStyle.getPropertyValue('line-height')
		|| (textAreaStyle.getPropertyValue('font-size') * 1.5) // 1.5 is standard XUI line-height
		|| 15 * 1.5; // 15px is standard XUI font-size
	const lineHeightFloat = parseFloat(lineHeight) || 15 * 1.5;
	const bottomPadding = parseFloat(textAreaStyle.getPropertyValue('padding-bottom')) || 0;
	const topPadding = parseFloat(textAreaStyle.getPropertyValue('padding-top')) || 0;
	const cssMaxHeight = parseFloat(textAreaStyle.getPropertyValue('max-height'))
		// If max-height can't be found, use current height
		|| parseFloat(textAreaStyle.getPropertyValue('height'));

	const maxHeight = maxRows && lineHeightFloat && !isNaN(lineHeightFloat)
		? (maxRows * lineHeightFloat) + bottomPadding + topPadding
		: cssMaxHeight || 1000; // Just to be 100% sure we return *something* if we get to this point.

	return Math.max(0, maxHeight);
};

/**
 * @private
 * Calculates length of a string in a way that accounts for 'astral' characters (characters outside
 * of regular character set, namely emojis)
 * @returns {Number} a more accurate string length than String.prototype.length offers
 */
export const calculateAstralLength = string => [...string].length;

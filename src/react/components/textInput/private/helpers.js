
/**
 * @private
 * Calculates the max height for the textarea based off `maxRows`. Will default to the CSS value if no `maxRows` is provided
 * @returns {Number} value of the max height in pixels
 */
export const calculateMaxHeight = ({textArea, maxRows}) => {
	const textAreaStyle = window.getComputedStyle(textArea);
	const lineHeight = parseFloat(textAreaStyle.getPropertyValue('line-height'));
	const verticalPadding = parseFloat(textAreaStyle.getPropertyValue('padding-bottom')) + parseFloat(textAreaStyle.getPropertyValue('padding-top'));
	const cssMaxHeight = parseFloat(textAreaStyle.getPropertyValue('max-height'));

	const maxHeight = maxRows ? maxRows * lineHeight + verticalPadding : cssMaxHeight;

	return Math.max(0, maxHeight);
};

/**
 * @private
 * Calculates length of a string in a way that accounts for 'astral' characters (characters outside of regular character set, namely emojis)
 * @returns {Number} a more accurate string length than String.prototype.length offers
 */
export const calculateAstralLength = (string) => {
	return [...string].length;
};

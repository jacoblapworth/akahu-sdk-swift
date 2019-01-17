import verge from 'verge';
import breakpoints from '../../helpers/breakpoints';

/**
 * Tests the height and width of the given rectangle and returns true if the size is
 * greater than 0x0
 *
 * @param {DOMRect} baseRect
 * @return {boolean}
 */
export const isBaseRendered = baseRect => baseRect && baseRect.height > 0 && baseRect.width > 0;

/**
* Tests the viewport against a narrow width.
*
* @return {boolean}
*/
export const isNarrowViewport = () => verge.viewportW() < breakpoints.small;

/**
* Calculates the space below the trigger
*
* @param {DOMRect} triggerRect
* @return {Number}
*/
export const calcSpaceBelow = triggerRect => Math.max(verge.viewportH() - triggerRect.bottom, 0);

/**
* Calulates the space above the trigger
*
* @param {DOMRect} triggerRect
* @return {Number}
*/
export const calcSpaceAbove = triggerRect => Math.max(triggerRect.top, 0);

/**
 * Determine the number of pixels between the right edge of the trigger and the right edge
 * of the window.
 *
 * @param {DOMRect} triggerRect
 * @returns {Number}
 */
export const calcSpaceRight = triggerRect => Math.max(verge.viewportW() - triggerRect.right, 0);

/**
 * Determine the number of pixels between the left edge of the trigger and the left edge
 * of the window.
 *
 * @param {DOMRect} triggerRect
 * @returns {Number}
 */
export const calcSpaceLeft = triggerRect => Math.max(triggerRect.left, 0);

/**
 * Given a trigger DOM element, return the surrounding spaces.
 *
 * @private
 * @param {DOMRect} triggerRect
 * @returns {{above: number, below: number, left: number, right: number}}
 */
export const getSpacesAroundTrigger = triggerRect => ({
	above: calcSpaceAbove(triggerRect),
	below: calcSpaceBelow(triggerRect),
	left: calcSpaceLeft(triggerRect),
	right: calcSpaceRight(triggerRect),
});

/**
 * Given a positionSetting property, split into side and alignment positioning values.
 *
 * @private
 * @param {object} spaces
 * @returns {{top: number, bottom: number, left: number, right: number}}
 */
export const mapOppositeSpaces = spaces => ({
	top: spaces.below,
	bottom: spaces.above,
	left: spaces.right,
	right: spaces.left,
});

/**
* Returns the top scroll amount, supported across mutliple browsers
*
* @return {Number}
*/
export const scrollTopAmount = () =>
	window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

/**
* Returns the left scroll amount, supported across mutliple browsers
*
* @return {Number}
*/
export const scrollLeftAmount = () =>
	window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

/**
 * Listeners to attach to window
 *
 * @param {Positioning} popup
 */
export function attachListeners(popup) {
	if (typeof window !== 'undefined') {
		window.addEventListener('resize', popup.resizeAndScrollHandler);
		window.addEventListener('scroll', popup.resizeAndScrollHandler);
	}
}

/**
 * Listeners to detach from window
 *
 * @param {Positioning} popup
 */
export function detachListeners(popup) {
	if (typeof window !== 'undefined') {
		window.removeEventListener('resize', popup.resizeAndScrollHandler);
		window.removeEventListener('scroll', popup.resizeAndScrollHandler);
	}
}

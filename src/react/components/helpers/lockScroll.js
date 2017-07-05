import calcScrollbarWidth from 'scrollbar-width';

/**
 * Test to see if the body scroll is currently locked
 */
export const isScrollLocked = () => document.body.classList.contains('xui-u-overflow-hidden');

/**
 * @private
 *
 * Will set the scroll on the browser to be locked and visibly hidden so the content
 * underneath cannot be scrolled.
 */
export const lockScroll = () => {
	if (!isScrollLocked()) {
		const body = document.body;
		const existingPadding = parseInt(window.getComputedStyle(body).paddingRight, 10);
		const scrollbarSize = calcScrollbarWidth();
		const newPadding = isNaN(existingPadding) || !isFinite(existingPadding) ? scrollbarSize : scrollbarSize + existingPadding;
		body.classList.add('xui-u-overflow-hidden');
		body.style.paddingRight = `${newPadding}px`;
	}
};

/**
 * @private
 *
 * Will reset the body to have postition: static and overflow: auto instead of hidden.
 */
export const unlockScroll = () => {
	if (isScrollLocked()) {
		document.body.classList.remove('xui-u-overflow-hidden');
		document.body.style.paddingRight = '';
	}
};

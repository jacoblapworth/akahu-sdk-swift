import calcScrollbarWidth from 'scrollbar-width';

let scrollState = null;

/**
 * Test to see if the body scroll is currently locked
 *
 * @export
 */
export const isScrollLocked = () => document.documentElement.classList.contains('xui-u-lockscroll');

/**
 * Will set the scroll on the browser to be locked and visibly hidden so the content
 * underneath cannot be scrolled. Returns a boolean indicating whether this function
 * call was responsible for locking the scroll.
 *
 * @export
 */
export const lockScroll = () => {
	if (!isScrollLocked()) {
		const body = document.body;
		const html = document.documentElement;
		const existingPadding = parseInt(window.getComputedStyle(body).paddingRight, 10);
		const scrollbarSize = calcScrollbarWidth();
		const newPadding = isNaN(existingPadding) || !isFinite(existingPadding) ? scrollbarSize : scrollbarSize + existingPadding;

		// FF scrolls the HTML element.  Chrome scrolls the body.  Handle either.
		const scrollElement = body.scrollTop > 0 || html.scrollTop === 0 ? body : html;
		scrollState = {
			top: scrollElement.scrollTop,
			left: scrollElement.scrollLeft,
		};

		html.classList.add('xui-u-lockscroll');
		body.style.paddingRight = `${newPadding}px`;
		return true;
	}
	return false;
};

/**
 * Will reset the body to have postition: static and overflow: auto instead of hidden.
 *
 * @export
 */
export const unlockScroll = () => {
	if (isScrollLocked()) {
		const { body, documentElement: html } = document;

		body.style.paddingRight = '';
		html.classList.remove('xui-u-lockscroll');

		/*
		iOS still scrolls behind, so make sure the scroll position gets reset back to
		what it was when we locked scrolling.

		@author dev-johnsanders
		*/
		window.scrollTo(scrollState.left, scrollState.top);
	}
};

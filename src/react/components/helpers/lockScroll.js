import calcScrollbarWidth from 'scrollbar-width';
import getComputedStyle from './getComputedStyle';
import { ns } from './xuiClassNamespace';

let scrollState = null;
let scrollLockCount = 0;
const lockScrollClassName = `${ns}-lockscroll`;

/**
 * Test to see if the body scroll is currently locked
 *
 * @export
 */
export const isScrollLocked = () =>
	document.documentElement.classList.contains(lockScrollClassName);

/**
 * Will set the scroll on the browser to be locked and visibly hidden so the content
 * underneath cannot be scrolled. Returns a boolean indicating whether this function
 * call was responsible for locking the scroll.
 *
 * @export
 */
export const lockScroll = () => {
	scrollLockCount += 1;
	if (!isScrollLocked()) {
		const { body } = document;
		const html = document.documentElement;
		const existingPadding = parseInt(getComputedStyle(body, 'paddingRight'), 10);
		const scrollbarSize = calcScrollbarWidth();
		const newPadding = (typeof existingPadding === 'number' && isNaN(existingPadding)) ||
			!Number.isFinite(existingPadding)
			? scrollbarSize
			: scrollbarSize + existingPadding;

		// FF scrolls the HTML element.  Chrome scrolls the body.  Handle either.
		const scrollElement = body.scrollTop > 0 || html.scrollTop === 0 ? body : html;
		scrollState = {
			top: scrollElement.scrollTop,
			left: scrollElement.scrollLeft,
		};

		html.classList.add(lockScrollClassName);
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
	if (scrollLockCount <= 1 && isScrollLocked()) {
		const { body, documentElement: html } = document;

		body.style.paddingRight = '';
		html.classList.remove(lockScrollClassName);

		/*
		iOS still scrolls behind, so make sure the scroll position gets reset back to
		what it was when we locked scrolling.

		@author dev-johnsanders
		*/
		window.scrollTo(scrollState.left, scrollState.top);
	}
	if (scrollLockCount) {
		scrollLockCount -= 1;
	}
};

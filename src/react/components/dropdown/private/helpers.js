import breakpoints from '../../helpers/breakpoints';
import calcScrollbarWidth from 'scrollbar-width';

/**
 * Accepts one or more functions and curries a function that will call each passed function with the arguments passed
 * to the curried function.
 *
 * @public
 * @param {Function} fns
 * @returns {Function}
 */
export function compose(...fns) {
	return function () {
		fns.forEach(fn => {
			if (typeof fn === 'function') {
				fn.apply(this, arguments);
			}
		});
	}
}

/**
 * Simple predicated used to determine if the ListBox's root DOM node can actually be focused.
 *
 * @public
 * @param {HTMLElement} node
 *
 * @returns {boolean}
 */
export const isVisible = node => node && window.getComputedStyle(node).visibility !== 'hidden';


/**
 * Tests for height and width of the node to make sure it's rendered.
 *
 * @public
 * @param {HTMLElement} element
 *
 * @return {boolean}
 */
export const isRendered = element => element && element.offsetHeight > 0 &&  element.offsetWidth > 0;

/**
 * Attempts to run the passed predicate, if successful it will run the callback method and clear. If unsuccessful, it
 * will run several times over five seconds. If it's still unsuccessful after that it will try again several times over
 * a half second. If it's still not successful it will stop trying.
 *
 * @public
 * @param {Function} predicate
 * @param {Function} callback
 */
export const intervalRunner = (predicate, callback) => {
	if (predicate()) {
		callback();
	} else {
		let counter = 0;
		let interval = 0;
		const maxCount = 5;
		const delay = 100;
		const checker = function () {
			const check = predicate();
			if (check) {
				callback();
			}
			if (check|| counter > maxCount) {
				clearInterval(interval);
			}
			counter++;
		};

		interval = setInterval(checker, delay);
	}
};


/**
 * Detect if the item is below the bottom of the containing element that's scrollable
 * OR
 * Check it's not above the element that's scrollable.
 *
 * @public
 * @param {HTMLElement} itemDOM
 * @param {HTMLElement} scrollableDOM
 *
 * @returns {number}
 */
export function scrollTopPosition(itemDOM, scrollableDOM) {
	const elRect = itemDOM.getBoundingClientRect();
	const scrollableElRect = scrollableDOM.getBoundingClientRect();
	let scrollTopAmount = scrollableDOM.scrollTop;

	if (elRect.bottom > scrollableElRect.bottom) {
		scrollTopAmount = scrollableDOM.scrollTop + (elRect.bottom - scrollableElRect.bottom);
	} else if (elRect.top < scrollableElRect.top) {
		scrollTopAmount = scrollableDOM.scrollTop - (scrollableElRect.top - elRect.top);
	}

	return scrollTopAmount;
}

export const isNarrowViewport = () => window.document.documentElement.clientWidth < breakpoints.narrow;

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

import breakpoints from '../../helpers/breakpoints';

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
export const isRendered = element => element && element.offsetHeight > 0 && element.offsetWidth > 0;

/**
 * Attempts to run the passed predicate, if successful it will run the callback method and clear.
 * If unsuccessful, it will run several times over five seconds. If it's still unsuccessful after
 * that it will try again several times over a half second. If it's still not successful it will
 * stop trying.
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
		const checker = () => {
			const check = predicate();
			if (check) {
				callback();
			}
			if (check || counter > maxCount) {
				clearInterval(interval);
			}
			counter += 1;
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
		scrollTopAmount += (elRect.bottom - scrollableElRect.bottom);
	} else if (elRect.top < scrollableElRect.top) {
		scrollTopAmount -= (scrollableElRect.top - elRect.top);
	}

	return scrollTopAmount;
}

export const checkIsNarrowViewport = () =>
	typeof window !== 'undefined'
	&& window.document.documentElement.clientWidth < breakpoints.small;

/**
 * Add the window event listeners that the DropDownToggled depends on.
 *
 * @export
 * @param {DropDownToggled} ddt
 */
export const addEventListeners = ddt => {
	if (typeof window !== 'undefined') {
		window.addEventListener('mousedown', ddt.onMouseDown);
		window.addEventListener('touchstart', ddt.onMouseDown);
		window.addEventListener('resize', ddt.onResize);
		if (ddt.props.repositionOnScroll) {
			window.addEventListener('scroll', ddt.onScroll);
		}
	}
};

/**
 * Remove the window event listeners that the DropDownToggled might have added.
 *
 * @export
 * @param {DropDownToggled} ddt
 */
export const removeEventListeners = ddt => {
	if (typeof window !== 'undefined') {
		window.removeEventListener('mousedown', ddt.onMouseDown);
		window.removeEventListener('touchstart', ddt.onMouseDown);
		window.removeEventListener('resize', ddt.onResize);
		window.removeEventListener('scroll', ddt.onScroll);
	}
};

/**
 * Throttles the execution of the given function to requestAnimationFrame.
 * This isn't a general solution since it depends on no args being passed, but
 * it's good enough for now
 *
 * @export
 * @param {Function} fn
 */
export const throttleToFrame = fn => {
	let requestingFrame = false;
	const wrapped = () => {
		fn();
		requestingFrame = false;
	};
	return () => {
		if (!requestingFrame) {
			window.requestAnimationFrame(wrapped);
			requestingFrame = true;
		}
	};
};

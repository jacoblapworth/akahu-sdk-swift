/**
 * Accepts one or more functions and curries a function that will call each passed function with the arguments passed
 * to the curried function.
 *
 * @private
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
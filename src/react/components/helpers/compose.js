/**
 * Accepts one or more functions and curries a function that will call each passed
 * function with the arguments passed to the curried function.
 *
 * @private
 * @param {Function} fns
 * @returns {Function}
 */
export default function compose(...fns) {
	/* eslint-disable */
	// TODO: Create ES6 equivalent to replace this with 'this' and arguments still applied
	return function () {
		fns.forEach(fn => {
			if (typeof fn === 'function') {
				fn.apply(this, arguments);
			}
		});
	};
}

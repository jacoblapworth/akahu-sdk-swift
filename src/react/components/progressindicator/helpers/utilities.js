// IE11 does not have official support for ".fill()" so we fallback to an alternative
// solution when applicable.
const createArray = (total) => Array().fill
	? new Array(total).fill(0)
	: Array.apply(null, Array(total)).map(Number.prototype.valueOf, 0);

const utilities = { createArray };

export { utilities as default, createArray }

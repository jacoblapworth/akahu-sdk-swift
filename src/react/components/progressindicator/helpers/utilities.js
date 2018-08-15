// IE11 does not have official support for ".fill()". In the interest of retaining
// as much functional programming / immutability as possible I am conditionally
// falling back to a "for loop" mutation.
const createArray = total => {
	const hasFill = Boolean([].fill);

	switch (false) {
	case hasFill: {
		const shell = [];
		for (let i = 0; i < total; i += 1) { shell.push(0); }
		return shell;
	}

	default:
		return new Array(total).fill(0);
	}
};

const utilities = { createArray };

export { utilities as default, createArray };

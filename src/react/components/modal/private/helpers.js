const body = document.body;
const previousStyles = {};

function applyStyles(from, to) {
	to.position = from.position;
	to.overflow = from.overflow;
	to.top = from.top;
	to.left = from.left;
	to.width = from.width;
	to.height = from.height;
}

/**
* @private
*
* Will set the scroll on the browser to be locked and visibly hidden so the content
* underneath cannot be scrolled.
*/
export const lockScroll = () => {
	const top = body.scrollTop;
	const left = body.scrollLeft;

	applyStyles(body.style, previousStyles);

	body.style.position = 'absolute';
	body.style.overflow = 'hidden';
	body.style.top = `${-top}px`;
	body.style.left = `${-left}px`;
	body.style.width = '100%';
	body.style.height = '100%';
};

/**
* @private
*
* Will reset the body to be static position and overflow is auto instead of hidden.
*/
export const unlockScroll = () => {
	applyStyles(previousStyles, body.style);
};

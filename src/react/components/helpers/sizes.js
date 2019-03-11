
export const sizesOrdered = [
	'2xsmall',
	'xsmall',
	'small',
	'medium',
	'large',
	'xlarge',
	'2xlarge',
	'3xlarge',
	'4xlarge',
	'5xlarge',
];

/**
 * Given a size and an integer "shift", return the size that is "shift" sizes away
 * from the given size. For example, we will often wish to find the next smallest
 * size for nesting one control in another. So provide the wrapping size and -1 to
 * get the appropriate size of the nested control. Uses "sizesOrdered" as its basis.
 *
 * @public
 * @param {string} size
 * @param {number} shift
 * @returns {string|null} Returns null if initial size is not found or if there is no
 * 												size at the given shift position.
 * @export
 */
export const sizeShift = (size, shift) => {
	const sizeIndex = sizesOrdered.indexOf(size);
	if (sizeIndex > -1) {
		return sizesOrdered[sizeIndex + shift] || null;
	}
	return null;
};


export const sizesOrdered = [
	'2xsmall',
	'xsmall',
	'small',
	'standard',
	'large',
	'xlarge',
	'2xlarge',
	'3xlarge',
	'4xlarge',
	'5xlarge',
];

export const sizeShift = (size, shift) => {
	const sizeIndex = sizesOrdered.indexOf(size);
	if (sizeIndex > -1) {
		return sizesOrdered[sizeIndex + shift];
	}
	return null;
};

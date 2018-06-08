const getTargetPosition = event => {
	const getTargetValue = reference => event.target[reference].baseVal.value;
	const left = getTargetValue('x');
	const top = getTargetValue('y');
	const height = getTargetValue('height');
	const width = getTargetValue('width');

	return { left, top, width, height };
};

export default getTargetPosition;

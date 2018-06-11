// Select the responsive option that is most appropriate to the current x-axis
// segment size.
const getResponsiveOption = (options, width) => {
	const keys = Object.keys(options);
	const key = (
		keys
			.reduce(
				(acc, option) => width > parseInt(option, 10) ? option : acc,
				keys[0]
			)
	);

	return options[key];
};

export default getResponsiveOption;

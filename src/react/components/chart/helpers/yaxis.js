export const createYAxisLabelFormatThunk = yAxisMaxValue => {
	const decimalPoints = `${yAxisMaxValue}`.split('.')[1] || 0;

	return (rawLabel) => {
		const factor = Math.pow(10, decimalPoints + 1);
		return Math.round(rawLabel * factor) / factor;
	};
};

export const createYAxisTickValues = ({ yAxisMaxValue, yAxisHeight }) => {
	const minimumGap = 100;
	const hasPositiveYValue = Boolean(yAxisMaxValue);
	const totalLabels = Math.floor(yAxisHeight / minimumGap);
	const increment = hasPositiveYValue
		? yAxisMaxValue / totalLabels
		// When there are no y-axis values the domain is [0, 0, 0] by default.
		// This blows up Victory so as a fallback (when there is no data and no
		// custom y-axis value) we simply count up by "1".
		: 1;

	return (
		new Array(totalLabels + 1)
			.fill(0)
			.map((_, index) => increment * index)
	);
};

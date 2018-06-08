import {createArray} from '../../progressindicator/helpers/utilities';
import {Y_AXIS_MIN_PADDING} from '../helpers/constants';

export const createYAxisLabelFormatThunk = yAxisMaxValue => {
	const decimalPoints = `${yAxisMaxValue}`.split('.')[1] || 0;

	return rawLabel => {
		const factor = Math.pow(10, decimalPoints + 1);

		return Math.round(rawLabel * factor) / factor;
	};
};

export const createYAxisTickValues = ({yAxisMaxValue, yAxisHeight}) => {
	const hasPositiveYValue = Boolean(yAxisMaxValue);
	const totalLabels = Math.floor(yAxisHeight / Y_AXIS_MIN_PADDING);
	const increment = hasPositiveYValue
		? yAxisMaxValue / totalLabels
		// When there are no y-axis values the domain is [0, 0, 0] by default.
		// This blows up Victory so as a fallback (when there is no data and no
		// custom y-axis value) we simply count up by "1".
		: 1;

	return createArray(totalLabels + 1).map((_, index) => increment * index);
};

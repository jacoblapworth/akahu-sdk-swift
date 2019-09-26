import { createArray } from '../../progressindicator/helpers/utilities';
import { forceValuePositive } from '../helpers/utilities';
import { Y_AXIS_MIN_PADDING } from '../helpers/constants';

export const getMinAndMaxYAxisTickValues = yAxisTickValues => ({
  yAxisMinValue: forceValuePositive(yAxisTickValues.slice(-1)[0]),
  yAxisMaxValue: forceValuePositive(yAxisTickValues[0]),
});

export const createYAxisLabelFormatThunk = ({ yAxisMaxValue }) => {
  const decimalRaw = `${yAxisMaxValue}`.split('.')[1];
  const decimalLength = decimalRaw ? decimalRaw.length : 0;

  return rawLabel => {
    // TODO: Refactor to use the `**` operator when our babel tools support it or when IE11 is dropped
    // eslint-disable-next-line no-restricted-properties
    const factor = Math.pow(10, decimalLength + 1);

    return Math.round(rawLabel * factor) / factor;
  };
};

export const createYAxisTickValues = ({ yAxisHeight, maxValue, minValue }) => {
  const minPlusMax = forceValuePositive(minValue) + (maxValue > 0 ? maxValue : 0);

  // NOTE: Does not include the "zero" based label which is handles by Victory as
  // a "special" include.
  const totalLabels = Math.floor(yAxisHeight / Y_AXIS_MIN_PADDING);

  // Re-establish the max value based on the proposed increment. If the increment
  // is too small then we need to fall back to the "raw" value.
  const incrementRaw = Math.ceil(minPlusMax / totalLabels);
  const yAxisMaxValue = incrementRaw > 1 ? incrementRaw * totalLabels : Math.ceil(maxValue);

  const hasAnyYValue = Boolean(yAxisMaxValue, minValue);
  // When there are no y-axis values the domain is [0, 0, 0] by default. This
  // blows up Victory so as a fallback (when there is no data and no custom y-axis
  // value) we simply count up by "1".
  const increment = hasAnyYValue ? forceValuePositive(minValue) + yAxisMaxValue / totalLabels : -1;
  const yAxisTickValues = createArray(totalLabels + 1).map(
    (_, index) => yAxisMaxValue - increment * index,
  );

  return yAxisTickValues;
};

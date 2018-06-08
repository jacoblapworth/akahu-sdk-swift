import getGroupPosition from './groupposition';
import createChartPadding from './chartpadding';

const alwaysPositive = value => Math.max(0, value) || 0;
const testIsCloseEnough = (next, previous, threshold = 2) => (
	next > previous - threshold && next < previous + threshold
);

export {getGroupPosition as default, createChartPadding, alwaysPositive, testIsCloseEnough};

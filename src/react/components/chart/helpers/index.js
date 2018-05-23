import getGroupPosition from './getGroupPosition';

const alwaysPositive = value => Math.max(0, value);
const testIsCloseEnough = (next, previous, threshold = 2) => next > previous - threshold && next < previous + threshold;

export { getGroupPosition as default, alwaysPositive, testIsCloseEnough };

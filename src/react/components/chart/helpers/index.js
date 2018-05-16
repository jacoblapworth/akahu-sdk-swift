import getGroupPosition from './getGroupPosition';

const threshold = 2;
const alwaysPositive = value => Math.max(0, value);
const testIsCloseEnough = (next, previous) => next > previous - threshold && next < previous + threshold;

export { getGroupPosition as default, alwaysPositive, testIsCloseEnough };

import getGroupPosition from './getGroupPosition';

const ap = value => Math.max(0, value);
const testIsCloseEnough = (next, previous) =>
  // console.log(`next "${next}" vs previous "${previous}"`) ||
	next > previous - 5 && next < previous + 5;

export { getGroupPosition as default, ap, testIsCloseEnough };

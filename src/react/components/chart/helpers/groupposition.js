import {forceValuePositive} from './utilities';
import {NAME_SPACE} from './constants';

const getGroupPosition = (groupNode) => {
	const nodes = groupNode
		? [...groupNode.querySelectorAll(`.${NAME_SPACE}-chart--measure`)]
		: [];

	if (!nodes.length) return {width: 0, height: 0};

	let position = (() => {
		const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
		const makeNegative = value => value * -1;

		return {
			maxLeft: makeNegative(windowHeight),
			maxTop: makeNegative(windowHeight),
			minTop: windowHeight,
			minLeft: windowWidth
		};
	})();

	nodes.forEach(node => {
		const {width = 0, height = 0, x = 0, y = 0} = (node.getBBox ? node.getBBox() : {});
		const {maxLeft, maxTop, minTop, minLeft} = position;

		position = {
			maxLeft: Math.max(width + x, maxLeft),
			maxTop: Math.max(height + y, maxTop),
			minTop: Math.min(y, minTop),
			minLeft: Math.min(x, minLeft),
		};
	});

	return {
		width: forceValuePositive(position.maxLeft - position.minLeft),
		height: forceValuePositive(position.maxTop - position.minTop)
	};
};

export default getGroupPosition;

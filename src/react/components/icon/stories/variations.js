const { wrapperSizeClasses, rotationClasses, colorClasses } = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIIcon';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'single icon',
		icon: 'cross',
		className: "capture",
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different colors',
		icon: 'star',
		subVariants: Object.keys(colorClasses).map(color => ({ color })),
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different sizes',
		icon: 'accessibility',
		subVariants: Object.keys(wrapperSizeClasses).map(size => ({ size })),
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different rotation',
		icon: 'arrow',
		subVariants: Object.keys(rotationClasses).map(rotation => ({ rotation })),
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'boxed with a set height and width',
		icon: 'arrow',
		subVariants: Object.keys(wrapperSizeClasses).map(size => ({
			size,
			isBoxed: true,
		})),
	},

];

module.exports = {
	storiesWithVariationsKindName,
	variations,
};

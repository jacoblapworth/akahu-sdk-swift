const modalSizes = require('../constants').modalSizes;

const storiesWithVariationsKindName = 'Instances/XUIModal';

const sizes = Object.keys(modalSizes).map(size => ({
	storyKind: storiesWithVariationsKindName,
	storyTitle: `size ${size}`,
	header: true,
	footer: true,
	size,
}));

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'full modal',
		header: true,
		footer: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with header',
		header: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with footer',
		footer: true,
	},
	...sizes,
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
};

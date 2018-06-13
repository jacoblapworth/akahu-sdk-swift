const star = require('@xero/xui-icon/icons/star').default;
const cross = require('@xero/xui-icon/icons/cross').default;
const accessibility = require('@xero/xui-icon/icons/accessibility').default;
const arrow = require('@xero/xui-icon/icons/arrow').default;
const { wrapperSizeClasses, rotationClasses, colorClasses } = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIIcon'

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with path',
		icon: cross,
		className: "capture"
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different colors',
		icon: star,
		subVariants: Object.keys(colorClasses).map(color => ({ color }))
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different sizes',
		icon: accessibility,
		subVariants: Object.keys(wrapperSizeClasses).map(size => ({ size }))
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different rotation',
		icon: arrow,
		subVariants: Object.keys(rotationClasses).map(rotation => ({ rotation }))
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'boxed with a set height and width',
		icon: arrow,
		subVariants: Object.keys(wrapperSizeClasses).map(size => ({
			size,
			isBoxed: true
		})),
	}

];

module.exports = {
	storiesWithVariationsKindName,
	variations,
}

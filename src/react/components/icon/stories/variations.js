const star = require('@xero/xui-icon/icons/star').default;
const cross = require('@xero/xui-icon/icons/cross').default;
const accessibility = require('@xero/xui-icon/icons/accessibility').default;
const arrow = require('@xero/xui-icon/icons/arrow').default;
const { sizeClasses, rotationClasses, colorClasses } = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIIcon'

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with path',
		path: cross,
		className: "capture"
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different colors',
		path: star,
		subVariants: Object.keys(colorClasses).map(color => ({ color }))
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different sizes',
		path: accessibility,
		subVariants: Object.keys(sizeClasses).map(size => ({ size }))
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with different rotation',
		path: arrow,
		subVariants: Object.keys(rotationClasses).map(rotation => ({ rotation }))
	}

];

module.exports = {
	storiesWithVariationsKindName,
	variations,
}

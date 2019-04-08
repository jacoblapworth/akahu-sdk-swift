const storiesWithVariationsKindName = 'Instances/XUICapsule';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'default',
		href: "http://www.xero.com",
		value: "Capsule",
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'not interactive but valid',
		value: "Capsule",
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is invalid',
		isValid: false,
		isLink: false,
		value: "Invalid capsule",
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
}

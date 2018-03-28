const iconData = require('@xero/xui-icon/lib/private/iconData').default;
const storiesWithVariationsKindName = 'Instances/XUIIsolationHeader';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'Navigation only',
		title: 'Main title',
		secondaryTitle: 'Secondary Title',
		navigationIconPath: iconData.navigation.cross
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'Navigation and actions',
		title: 'Main title',
		secondaryTitle: 'Secondary Title',
		navigationIconPath: iconData.navigation.cross,
		actionIconPath: iconData.navigation.overflow,
		hasActionsPrimaryButton: true,
		hasActionsSecondaryButton: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'Jam-packed',
		hasAvatar: true,
		hasTag: true,
		navigationIconPath: iconData.navigation.cross,
		actionIconPath: iconData.navigation.overflow,
		title: 'Every time I see those chocka full boxes of fluffies it\'s like Rangitoto Island all over again aye, you\'re not in Guatemala now.',
		secondaryTitle: 'To find the true meaning of life, one must start cooking up a feed with the lamington, mate.',
		hasActionsPrimaryButton: true,
		hasActionsSecondaryButton: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
};

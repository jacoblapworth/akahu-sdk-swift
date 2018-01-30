const constants = require('../constants');

const sizes = Object.keys(constants.sizeClassNames);

const storiesWithVariationsKindName = 'Instances/XUIAvatar';

const avatarVariations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with value',
		value: 'value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with identifier',
		identifier: 'random id'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with value and identifier',
		identifier: 'random id',
		value: 'value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with image',
		imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg',
		value: 'value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'variant business',
		value: 'business',
		variant: 'business'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `standard sizes`,
		sizes,
		value: 'value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `business sizes`,
		sizes,
		variant: 'business',
		value: 'value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped avatars',
		value: 'value',
		grouped: true,
		avatarLength: 3
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped max length',
		value: 'value',
		grouped: true,
		avatarLength: 5,
		maxAvatars: 3
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped business',
		value: 'value',
		grouped: true,
		variant: 'business',
		avatarLength: 3
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped business max length',
		value: 'value',
		grouped: true,
		variant: 'business',
		avatarLength: 5,
		maxAvatars: 3
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped avatars many sizes',
		value: 'value',
		grouped: true,
		sizes,
		avatarLength: 5,
		maxAvatars: 3
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'grouped avatars many sizes business',
		value: 'value',
		grouped: true,
		sizes,
		variant: 'business',
		avatarLength: 5,
		maxAvatars: 3
	},
]

module.exports = {
	variations: avatarVariations,
	storiesWithVariationsKindName
}
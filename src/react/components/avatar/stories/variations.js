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
	}
]

module.exports = {
	variations: avatarVariations,
	storiesWithVariationsKindName
}

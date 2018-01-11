const storiesWithVariationsKindName = 'Instances/XUITextInput';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is plain',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless and transparent',
		isBorderlessTransparent: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless with a solid background',
		isBorderlessSolid: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless and transparent, inverted',
		isBorderlessTransparent: true,
		isInverted: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless with a solid background, inverted',
		isBorderlessSolid: true,
		isInverted: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is invalid',
		isInvalid: true,
		validationMessage: 'invalid content'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a hint message and placeholder',
		hintMessage: 'here\'s a hint',
		placeholder: 'This is a search box'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right hand button',
		showRightElement: true,
		defaultValue: 'default text'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left hand icon',
		showLeftElement: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left hand icon with wrapping color',
		showLeftElement: true,
		showWrapperColor: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
		variations
}

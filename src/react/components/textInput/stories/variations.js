const storiesWithVariationsKindName = 'Instances/XUITextInput';
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is plain',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless and transparent',
		isBorderlessTransparent: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless with a solid background',
		isBorderlessSolid: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless and transparent, inverted',
		isBorderlessTransparent: true,
		isInverted: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless with a solid background, inverted',
		isBorderlessSolid: true,
		isInverted: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a label',
		labelText: 'Label text',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a hidden label',
		labelText: 'Label text',
		isLabelHidden: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is invalid',
		isInvalid: true,
		validationMessage: 'invalid content',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is disabled',
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a hint message and placeholder',
		hintMessage: 'here\'s a hint',
		placeholder: 'This is a search box',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right icon',
		rightElementType: 'icon',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right icon with background colour',
		rightElementType: 'iconWithBackground',
		hasRightElementBackground: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right text element',
		rightElementType: 'text',
		hasRightElementBackground: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right button element',
		rightElementType: 'button',
		hasRightElementBackground: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left icon',
		leftElementType: 'icon',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left icon with wrapping color',
		leftElementType: 'iconWithBackground',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left text prompt',
		leftElementType: 'text',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left button',
		leftElementType: 'button',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has both side elements',
		leftElementType: 'button',
		rightElementType: 'iconWithBackground',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a multiline input',
		isMultiline: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'multiline input grown to fit contents',
		isMultiline: true,
		maxRows: 5,
		defaultValue: 'test\ntest\ntest\ntest\ntest',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'mutliline input with top aligned side element',
		isMultiline: true,
		rightElementType: 'iconWithBackground',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'mutliline input with center aligned side element',
		isMultiline: true,
		rightElementType: 'iconWithBackground',
		rightElementAlignment: 'center',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'mutliline input with bottom aligned side element',
		isMultiline: true,
		rightElementType: 'iconWithBackground',
		rightElementAlignment: 'bottom',
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
};

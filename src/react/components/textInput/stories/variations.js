const storiesWithVariationsKindName = 'Instances/XUITextInput';

const sideElements = [
	{
		type: 'icon',
		name: 'icon',
	},
	{
		type: 'iconWithBackground',
		name: 'icon with background colour',
	},
	{
		type: 'button',
		name: 'button element',
	},
	{
		type: 'pill',
		name: 'pill',
	},
	{
		type: 'text',
		name: 'text element',
	},
	{
		type: 'avatar',
		name: 'avatar',
	}
];

const inputSizes = ['standard', 'small', 'xsmall'];

const styleVariantStories = [
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
		storyTitle: 'with placeholder and no default',
		noDefault: true,
		placeholder: "First name"
	},
];

const labelAndValidationStories = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a label',
		label: 'Label text',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a hidden label',
		label: 'Label text',
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
		storyTitle: 'is borderless solid invalid',
		isBorderlessSolid: true,
		isInvalid: true,
		validationMessage: 'invalid solid input',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless transparent invalid',
		isBorderlessTransparent: true,
		isInvalid: true,
		validationMessage: 'invalid transparent input',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is disabled',
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless disabled',
		isBorderlessSolid: true,
		isDisabled: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a hint message and placeholder',
		hintMessage: 'here\'s a hint',
		placeholder: 'This is a search box',
	},
];

const sideElementVariantStories = sideElements.reduce((stories, sideElement) => [
	...stories,
	...['left', 'right'].map(side => ({
		storyKind: storiesWithVariationsKindName,
		storyTitle: `has a ${side} ${sideElement.name}`,
		[`${side}ElementType`]: sideElement.type,
	}))
], []);

const bothSideElementsWithSizes = inputSizes.map(size => {
	return {
		storyKind: storiesWithVariationsKindName,
		storyTitle: `${size} with both side elements`,
		leftElementType: 'avatar',
		rightElementType: 'icon',
		size,
	};
});

const multilineStories = [
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
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'small mutliline input with both side elements',
		isMultiline: true,
		size: 'small',
		rightElementType: 'button',
		rightElementAlignment: 'bottom',
		leftElementType: 'pill',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'xsmall mutliline input with both side elements',
		isMultiline: true,
		size: 'xsmall',
		rightElementType: 'icon',
		rightElementAlignment: 'center',
		leftElementType: 'avatar',
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations: [
		...styleVariantStories,
		...labelAndValidationStories,
		...sideElementVariantStories,
		...bothSideElementsWithSizes,
		...multilineStories,
	],
};

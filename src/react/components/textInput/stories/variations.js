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
];

const labelAndValidationStories = [
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
	const shouldRenderButton = size !== 'xsmall';
	const sideElementsDescription = shouldRenderButton
		? 'both side elements'
		: 'left avatar';

	return {
		storyKind: storiesWithVariationsKindName,
		storyTitle: `${size} with ${sideElementsDescription}`,
		leftElementType: 'avatar',
		rightElementType: shouldRenderButton ? 'icon' : undefined,
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

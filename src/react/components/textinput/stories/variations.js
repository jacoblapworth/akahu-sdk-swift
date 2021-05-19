import { desktopPlus320 } from '../../../stories/helpers/viewports';

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
    type: 'icon button',
    name: 'icon button element',
    size: 'xsmall',
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
  },
];

const inputSizes = ['medium', 'small', 'xsmall'];

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
    placeholder: 'First name',
  },
];

const labelAndValidationStories = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has a label',
    label: 'Label text',
    inputProps: {
      id: 'test_input_id',
    },
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
    hintMessage: "here's a hint",
    placeholder: 'This is a search box',
    inputProps: {
      id: 'test_input_id',
    },
  },
];

const sideElementVariantStories = sideElements.reduce(
  (stories, sideElement) => [
    ...stories,
    ...['left', 'right'].map(side => ({
      storyKind: storiesWithVariationsKindName,
      storyTitle: `has a ${side} ${sideElement.name}`,
      [`${side}ElementType`]: sideElement.type,
      [`${side}ElementAlignment`]: 'center',
    })),
  ],
  [],
);

const bothSideElementsWithSizes = inputSizes.map(size => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `${size} with both side elements`,
  leftElementType: 'avatar',
  rightElementType: 'icon',
  rightElementAlignment: 'center',
  size,
}));

const multilineStories = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as an xsmall multiline input',
    isMultiline: true,
    size: 'xsmall',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a small multiline input',
    isMultiline: true,
    size: 'small',
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
    rightElementAlignment: 'top',
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
    leftElementType: 'avatar',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall mutliline input with both side elements',
    isMultiline: true,
    size: 'xsmall',
    rightElementType: 'icon',
    rightElementAlignment: 'center',
    leftElementType: 'avatar',
    inputProps: {
      id: 'test_input_id',
    },
  },
];
const responsiveStories = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with flexible width',
    viewports: desktopPlus320,
    label: 'Flexible width',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flex-width input with both side elements',
    viewports: desktopPlus320,
    rightElementType: 'text',
    leftElementType: 'button',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flex-width mutliline input with both side elements',
    viewports: desktopPlus320,
    isMultiline: true,
    rightElementType: 'pill',
    leftElementType: 'iconWithBackground',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flex-width input with both side elements (long)',
    viewports: desktopPlus320,
    leftElementType: 'longText',
    rightElementType: 'longButton',
    customDecorator: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'flex-width mutliline input with both side elements (long)',
    viewports: desktopPlus320,
    isMultiline: true,
    leftElementType: 'longText',
    rightElementType: 'longButton',
    customDecorator: true,
  },
];
const inputAlignmentStories = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'input is reverse-aligned',
    isValueReverseAligned: true,
  },
];

const characterLimitStories = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has a displayed character limit',
    label: 'Label text',
    characterCounter: {
      maxCharCount: 100,
    },
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Aenean',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has character limit and validation message displayed',
    label: 'Label text',
    characterCounter: {
      maxCharCount: 100,
      validationMessage: 'Username must be no longer than 10 characters',
    },
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean Aenean',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has a long label',
    label:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet efficitur erat. Proin ut fringilla odio. Pellentesque nec aliquam dui. Mauris nec quam vitae nisl vehicula aliquam. In ultrices tortor diam, in consequat ligula facilisis vitae. Donec ac massa accumsan nulla efficitur tincidunt at ut arcu. Quisque eu arcu lorem. Donec non sem massa. Vivamus sit amet risus neque. Suspendisse dapibus velit at sodales pulvinar. Morbi tempor in ligula ut maximus. Pellentesque ac porta augue. Nullam mauris sapien, commodo non est nec, porttitor venenatis urna. Donec scelerisque lorem nibh, pretium pellentesque metus bibendum ut. Duis sed feugiat ex. Sed sagittis pharetra eros id mollis.',
    characterCounter: {
      maxCharCount: 100,
    },
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean.',
  },
];

const variations = [
  ...styleVariantStories,
  ...labelAndValidationStories,
  ...sideElementVariantStories,
  ...bothSideElementsWithSizes,
  ...multilineStories,
  ...responsiveStories,
  ...inputAlignmentStories,
  ...characterLimitStories,
];

export { storiesWithVariationsKindName, variations };

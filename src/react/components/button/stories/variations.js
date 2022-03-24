import settings from '@xero/xui-icon/icons/settings';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const privateConsts = require('../private/constants');

export const buttonStoriesWithKnobsKindName = 'Components/XUIButton';
export const buttonStoriesWithVariationsKindName = `${buttonStoriesWithKnobsKindName}/Tests`;

export const iconButtonStoriesWithKnobsKindName = 'Components/XUIIconButton';
export const iconButtonStoriesWithVariationsKindName = `${iconButtonStoriesWithKnobsKindName}/Tests`;

export const buttonGroupStoriesWithKnobsKindName = 'Components/XUIButtonGroup';
export const buttonGroupStoriesWithVariationsKindName = `${buttonGroupStoriesWithKnobsKindName}/Tests`;

export const splitButtonGroupStoriesWithKnobsKindName = 'Components/XUISplitButtonGroup';
export const splitButtonGroupStoriesWithVariationsKindName = `${splitButtonGroupStoriesWithKnobsKindName}/Tests`;

const sizes = Object.keys(privateConsts.sizeClassNames);
const iconSizes = Object.keys(privateConsts.iconSizeClassNames);

const buttonVariations = [
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'as Disabled',
    isDisabled: true,
    value: 'Disabled button',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'with multiline content',
    viewports: desktopPlus320,
    value:
      'Some very long text to test how buttons behave when their content is longer than the alotted space. Some very long text to test how buttons behave when their content is longer than the alotted space.',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'with caret',
    contentsKey: 'withCaret',
    hasCaret: true,
    variant: 'create',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'small with caret',
    contentsKey: 'withCaret',
    hasCaret: true,
    size: 'small',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'with left icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'xsmall with left icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
    size: 'xsmall',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'with right icon',
    contentsKey: 'withIcon',
    rightIcon: settings,
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'xsmall with right icon',
    contentsKey: 'withIcon',
    rightIcon: settings,
    size: 'xsmall',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'as small fullWidth',
    viewports: desktopPlus320,
    value: 'fullWidth always',
    fullWidth: 'always',
    size: 'small',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'as large fullWidth with an icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
    viewports: desktopPlus320,
    value: 'fullWidth with icon',
    fullWidth: 'always',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: 'as medium fullWidth small-down',
    viewports: desktopPlus320,
    value: 'fullWidth small-down',
    fullWidth: 'small-down',
  },
  {
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: `with short content and hasMinLoaderWidth`,
    value: 'B',
    hasMinLoaderWidth: true,
  },
];

const buttonGroupVariations = [
  {
    storyKind: buttonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a Group',
    contentsKey: 'asGroup',
    componentType: 'XUIButtonGroup',
  },
  {
    storyKind: buttonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a Group with multiline content',
    viewports: desktopPlus320,
    contentsKey: 'asMultiGroup',
    componentType: 'XUIButtonGroup',
  },
  {
    storyKind: buttonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a small Group',
    contentsKey: 'asGroup',
    componentType: 'XUIButtonGroup',
    size: 'small',
  },
];

const splitButtonGroupVariations = [
  {
    storyKind: splitButtonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a Split Button Group',
    contentsKey: 'asSplitGroup',
    componentType: 'XUISplitButtonGroup',
    variant: 'main',
  },
  {
    storyKind: splitButtonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a Split Button Group with multi-line text',
    componentType: 'XUISplitButtonGroup',
    variant: 'main',
    contentsKey: 'asSplitGroupMulti',
  },
  {
    storyKind: splitButtonGroupStoriesWithVariationsKindName,
    storyTitle: 'as a small negative Split Button Group',
    contentsKey: 'asSplitGroup',
    componentType: 'XUISplitButtonGroup',
    variant: 'negative',
    size: 'small',
  },
  {
    storyKind: splitButtonGroupStoriesWithVariationsKindName,
    storyTitle: 'as an xsmall Split Button Group with a dropdown',
    contentsKey: 'asSplitGroupDropdown',
    componentType: 'XUISplitButtonGroup',
    size: 'xsmall',
    variant: 'main',
  },
];

Object.keys(privateConsts.textButtonVariants).forEach((buttonVariant, index) => {
  const sizesToIterate = [sizes[index % sizes.length]];

  sizesToIterate.forEach(size =>
    buttonVariations.push({
      storyKind: buttonStoriesWithVariationsKindName,
      storyTitle: `as ${size} ${buttonVariant}`,
      href: buttonVariant === 'link' ? '#' : undefined,
      isLink: buttonVariant === 'link',
      size,
      value: buttonVariant,
      variant: buttonVariant,
    }),
  );
});

sizes.forEach(sizeVariant => {
  buttonVariations.push({
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: `${sizeVariant} with a Loader`,
    size: sizeVariant,
    isLoading: true,
    loadingAriaLabel: 'Loading',
    className: 'xui-loader-static', // Prevent dots from animating and causing diffs due to timing issues
    value: 'This is a button',
  });
  buttonVariations.push({
    storyKind: buttonStoriesWithVariationsKindName,
    storyTitle: `${sizeVariant} with short content`,
    size: sizeVariant,
    value: 'B',
  });
});

const iconButtonVariations = [];

iconSizes.forEach(iconSize => {
  const iconButton = {
    storyKind: iconButtonStoriesWithVariationsKindName,
    storyTitle: `${iconSize} iconButton`,
    componentType: 'XUIIconButton',
    size: iconSize,
  };
  iconButtonVariations.push(iconButton);
  iconButtonVariations.push({
    ...iconButton,
    isInverted: true,
    storyTitle: `${iconSize} inverted ${iconButton.storyTitle}`,
  });
});

export {
  buttonVariations,
  iconButtonVariations,
  buttonGroupVariations,
  splitButtonGroupVariations,
};

export const variations = [
  ...buttonVariations,
  ...iconButtonVariations,
  ...buttonGroupVariations,
  ...splitButtonGroupVariations,
];

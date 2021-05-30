import settings from '@xero/xui-icon/icons/settings';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const privateConsts = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIButton';
const sizes = Object.keys(privateConsts.sizeClassNames);
const iconSizes = Object.keys(privateConsts.iconSizeClassNames);
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Disabled',
    isDisabled: true,
    value: 'Disabled button',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with multiline content',
    viewports: desktopPlus320,
    value:
      'Some very long text to test how buttons behave when their content is longer than the alotted space. Some very long text to test how buttons behave when their content is longer than the alotted space.',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with caret',
    contentsKey: 'withCaret',
    hasCaret: true,
    variant: 'create',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small with caret',
    contentsKey: 'withCaret',
    hasCaret: true,
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with left icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall with left icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
    size: 'xsmall',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with right icon',
    contentsKey: 'withIcon',
    rightIcon: settings,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall with right icon',
    contentsKey: 'withIcon',
    rightIcon: settings,
    size: 'xsmall',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a Group',
    contentsKey: 'asGroup',
    componentType: 'XUIButtonGroup',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a Group with multiline content',
    viewports: desktopPlus320,
    contentsKey: 'asMultiGroup',
    componentType: 'XUIButtonGroup',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a small Group',
    contentsKey: 'asGroup',
    componentType: 'XUIButtonGroup',
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a Split Button Group',
    contentsKey: 'asSplitGroup',
    componentType: 'XUISplitButtonGroup',
    variant: 'primary',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a Split Button Group with multi-line text',
    componentType: 'XUISplitButtonGroup',
    variant: 'primary',
    contentsKey: 'asSplitGroupMulti',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as a small negative Split Button Group',
    contentsKey: 'asSplitGroup',
    componentType: 'XUISplitButtonGroup',
    variant: 'negative',
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as an xsmall Split Button Group with a dropdown',
    contentsKey: 'asSplitGroupDropdown',
    componentType: 'XUISplitButtonGroup',
    size: 'xsmall',
    variant: 'primary',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as small fullWidth',
    viewports: desktopPlus320,
    value: 'fullWidth always',
    fullWidth: 'always',
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as large fullWidth with an icon',
    contentsKey: 'withIcon',
    leftIcon: settings,
    viewports: desktopPlus320,
    value: 'fullWidth with icon',
    fullWidth: 'always',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as medium fullWidth small-down',
    viewports: desktopPlus320,
    value: 'fullWidth small-down',
    fullWidth: 'small-down',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with short content and hasMinLoaderWidth`,
    value: 'B',
    hasMinLoaderWidth: true,
  },
];

Object.keys(privateConsts.textButtonVariants).forEach((buttonVariant, index) => {
  const sizesToIterate = [sizes[index % sizes.length]];

  sizesToIterate.forEach(size =>
    variations.push({
      storyKind: storiesWithVariationsKindName,
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
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `${sizeVariant} with a Loader`,
    size: sizeVariant,
    isLoading: true,
    loadingAriaLabel: 'Loading',
    className: 'xui-loader-static', // Prevent dots from animating and causing diffs due to timing issues
    value: 'This is a button',
  });
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `${sizeVariant} with short content`,
    size: sizeVariant,
    value: 'B',
  });
});

iconSizes.forEach(iconSize => {
  const iconButton = {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `${iconSize} iconButton`,
    componentType: 'XUIIconButton',
    size: iconSize,
  };
  variations.push(iconButton);
  variations.push({
    ...iconButton,
    isInverted: true,
    storyTitle: `${iconSize} inverted ${iconButton.storyTitle}`,
  });
});

export { storiesWithVariationsKindName, variations };

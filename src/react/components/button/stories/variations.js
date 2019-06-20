import { desktopPlus320 } from '../../../stories/helpers/viewports';

const privateConsts = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIButton';
const buttonVariants = Object.keys(privateConsts.variantClassNames);
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
    storyTitle: 'with Caret',
    contentsKey: 'withCaret',
    variant: 'create',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small with Caret',
    contentsKey: 'withCaret',
    size: 'small',
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
    storyTitle: 'as medium fullWidth small-down',
    viewports: desktopPlus320,
    value: 'fullWidth small-down',
    fullWidth: 'small-down',
  },
];

buttonVariants.forEach((buttonVariant, index) => {
  const isIcon = buttonVariant.match(/^icon/) && buttonVariant.match(/^icon/)[0];
  const sizesToIterate = isIcon ? iconSizes : [sizes[index % sizes.length]];

  sizesToIterate.forEach(size =>
    variations.push({
      storyKind: storiesWithVariationsKindName,
      storyTitle: `as ${size} ${buttonVariant}`,
      href: buttonVariant === 'link' ? '#' : undefined,
      isLink: buttonVariant === 'link',
      size,
      value: isIcon ? undefined : `${buttonVariant}`,
      contentsKey: isIcon ? 'icon' : undefined,
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
    className: 'xui-loader-static', // Prevent dots from animating and causing diffs due to timing issues
    value: 'This is a button',
  });
});

module.exports = {
  storiesWithVariationsKindName,
  variations,
};

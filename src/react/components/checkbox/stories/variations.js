import { desktopPlus320 } from '../../../stories/helpers/viewports';

const starIcon = require('@xero/xui-icon/icons/star').default;

const checkboxStoriesWithKnobsKindName = 'Components/XUICheckbox';
const checkboxStoriesWithVariationsKindName = `${checkboxStoriesWithKnobsKindName}/Tests`;

const checkboxGroupStoriesWithKnobsKindName = 'Components/XUICheckboxGroup';
const checkboxGroupStoriesWithVariationsKindName = `${checkboxGroupStoriesWithKnobsKindName}/Tests`;

const checkboxRangeSelectorStoriesWithKnobsKindName = 'Components/XUICheckboxRangeSelector';

const checkboxVariations = [
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'Default',
    labelText: 'Just a regular checkbox',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with no label',
    labelText: 'No Label Example',
    isLabelHidden: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'unchecked hover state',
    isLabelHidden: true,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'checked',
    labelText: 'Checked Example',
    isDefaultChecked: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'checked hover state',
    isDefaultChecked: true,
    isLabelHidden: true,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'disabled',
    labelText: 'Disabled Example',
    isDisabled: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'checked and disabled',
    labelText: 'Checked and Disabled Example',
    isDefaultChecked: true,
    isDisabled: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'checked small',
    labelText: 'Checked Small Example',
    isDefaultChecked: true,
    size: 'small',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'checked xsmall',
    labelText: 'Checked XSmall Example',
    isDefaultChecked: true,
    size: 'xsmall',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'indeterminate',
    labelText: 'Indeterminate Example',
    isIndeterminate: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'indeterminate and disabled',
    labelText: 'Indeterminate and Disabled Example',
    isIndeterminate: true,
    isDisabled: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'reversed label',
    labelText: 'Reversed Example',
    isReversed: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with an icon',
    labelText: 'Icon Example',
    iconMain: starIcon,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with an icon hover state',
    labelText: 'Icon Example',
    iconMain: starIcon,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with an icon and a long label',
    viewports: desktopPlus320,
    labelText:
      "You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man's beards it's like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise, to find the true meaning of life, one must start munting with the Edmonds Cook Book, mate.",
    iconMain: starIcon,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with an checked icon',
    labelText: 'Icon Example',
    isDefaultChecked: true,
    iconMain: starIcon,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'with an checked icon hover state',
    labelText: 'Icon Example',
    isDefaultChecked: true,
    iconMain: starIcon,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'inline group',
    isSeries: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'inline group reversed',
    isReversed: true,
    isSeries: true,
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'has a long label',
    viewports: desktopPlus320,
    labelText:
      "You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man's beards it's like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise, to find the true meaning of life, one must start munting with the Edmonds Cook Book, mate.",
  },
  {
    storyKind: checkboxStoriesWithVariationsKindName,
    storyTitle: 'has a long label and hint/vaildation',
    viewports: desktopPlus320,
    labelText:
      "You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man's beards it's like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise.",
    hintMessage: 'Here is some additional info to help with your choice',
  },
];

[false, true].forEach(isInvalid => {
  isInvalid &&
    checkboxVariations.push({
      storyKind: checkboxStoriesWithVariationsKindName,
      storyTitle: `with long validation message`,
      isInvalid,
      viewports: desktopPlus320,
      validationMessage:
        isInvalid && 'Validation message is longer longer longer here and could wrap wrap wrap',
    });
  [false, true].forEach(isLabelHidden => {
    [false, true].forEach(isReversed => {
      const isInvalidTitle = isInvalid ? 'with validation error' : 'with hint text';

      const isLabelHiddenTitle = isLabelHidden ? ' and hidden label' : '';

      const isReversedTitle = isReversed ? ' and reversed' : '';

      checkboxVariations.push({
        storyKind: checkboxStoriesWithVariationsKindName,
        storyTitle: `${isInvalidTitle}${isLabelHiddenTitle}${isReversedTitle}`,
        isInvalid,
        isLabelHidden,
        isReversed,
        hintMessage: !isInvalid && 'Hint text',
        validationMessage: isInvalid && 'Validation message',
      });
    });
  });
});

const checkboxGroupVarations = [
  {
    storyKind: checkboxGroupStoriesWithVariationsKindName,
    storyTitle: 'grouped',
    isGroup: true,
    groupProps: {
      label: 'Birds',
      hintMessage: 'This is a clue',
    },
  },
  {
    storyKind: checkboxGroupStoriesWithVariationsKindName,
    storyTitle: 'grouped and invalid',
    isGroup: true,
    groupProps: {
      label: 'Birds',
      hintMessage: 'hello',
      isInvalid: true,
      validationMessage: 'whoops',
    },
  },
  {
    storyKind: checkboxGroupStoriesWithVariationsKindName,
    storyTitle: 'grouped and reversed',
    isGroup: true,
    isReversed: true,
    groupProps: {
      label: 'Birds',
      hintMessage: 'This is a clue',
    },
  },
  {
    storyKind: checkboxGroupStoriesWithVariationsKindName,
    storyTitle: 'horizontal group',
    isGroup: true,
    viewports: desktopPlus320,
    groupProps: {
      isLockedVertical: false,
      swapAtBreakpoint: 'small',
    },
  },
  {
    storyKind: checkboxGroupStoriesWithVariationsKindName,
    storyTitle: 'horizontal group invalid',
    isGroup: true,
    viewports: desktopPlus320,
    groupProps: {
      isLockedVertical: false,
      swapAtBreakpoint: 'small',
      isInvalid: true,
      validationMessage: 'whoops',
    },
  },
];

const variations = [...checkboxVariations, ...checkboxGroupVarations];

export {
  checkboxStoriesWithVariationsKindName,
  checkboxStoriesWithKnobsKindName,
  checkboxGroupStoriesWithKnobsKindName,
  checkboxGroupStoriesWithVariationsKindName,
  checkboxRangeSelectorStoriesWithKnobsKindName,
  checkboxVariations,
  checkboxGroupVarations,
  variations,
};

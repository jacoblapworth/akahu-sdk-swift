import { desktopPlus320 } from '../../../stories/helpers/viewports';

const starIcon = require('@xero/xui-icon/icons/star').default;

const storiesWithVariationsKindName = 'Instances/XUICheckbox';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default',
    labelText: 'Just a regular checkbox',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with no label',
    labelText: 'No Label Example',
    isLabelHidden: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'checked',
    labelText: 'Checked Example',
    isDefaultChecked: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'disabled',
    labelText: 'Disabled Example',
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'checked and disabled',
    labelText: 'Checked and Disabled Example',
    isDefaultChecked: true,
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'checked small',
    labelText: 'Checked Small Example',
    isDefaultChecked: true,
    size: 'small',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'checked xsmall',
    labelText: 'Checked XSmall Example',
    isDefaultChecked: true,
    size: 'xsmall',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'indeterminate',
    labelText: 'Indeterminate Example',
    isIndeterminate: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'indeterminate and disabled',
    labelText: 'Indeterminate and Disabled Example',
    isIndeterminate: true,
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'reversed label',
    labelText: 'Reversed Example',
    isReversed: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with an icon',
    labelText: 'Icon Example',
    iconMain: starIcon,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped',
    isGroup: true,
    groupProps: {
      label: 'Birds',
      hintMessage: 'This is a clue',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped and reversed',
    isGroup: true,
    isReversed: true,
    groupProps: {
      label: 'Birds',
      hintMessage: 'This is a clue',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has a long label',
    viewports: desktopPlus320,
    labelText:
      "You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man's beards it's like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise, to find the true meaning of life, one must start munting with the Edmonds Cook Book, mate.",
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'has a long label and hint/vaildation',
    viewports: desktopPlus320,
    labelText:
      "You have no idea how choice our stuffed Tuis were aye. Every time I see those rip-off old man's beards it's like the sausage sizzle all over again aye, rack off. Anyway, James Cook is just Rhys Darby in disguise.",
    hintMessage: 'Here is some additional info to help with your choice',
  },
];

[false, true].forEach(isInvalid => {
  [false, true].forEach(isLabelHidden => {
    [false, true].forEach(isReversed => {
      const isInvalidTitle = isInvalid ? 'with validation error' : 'with hint text';

      const isLabelHiddenTitle = isLabelHidden ? ' and hidden label' : '';

      const isReversedTitle = isReversed ? ' and reversed' : '';

      variations.push({
        storyKind: storiesWithVariationsKindName,
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

export { storiesWithVariationsKindName, variations };

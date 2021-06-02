import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUISwitch';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Default',
    isDisabled: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Unchecked hover state',
    isLabelHidden: true,
    hoverSelector: '.xui-switch--control',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked and reversed',
    isChecked: true,
    isDisabled: false,
    isReversed: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked hover state',
    isChecked: true,
    isLabelHidden: true,
    hoverSelector: '.xui-switch--control',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Disabled with Hidden Label',
    isDisabled: true,
    isLabelHidden: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked and Disabled',
    isChecked: true,
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is grouped and reversed',
    isGroup: true,
    groupProps: {
      label: 'Group of switches',
      hintMessage: 'This is a hint message',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is grouped and invalid',
    isGroup: true,
    groupProps: {
      label: 'Group of switches',
      hintMessage: 'hello',
      isInvalid: true,
      validationMessage: 'whoops',
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
  isInvalid &&
    variations.push({
      storyKind: storiesWithVariationsKindName,
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

      variations.push({
        storyKind: storiesWithVariationsKindName,
        storyTitle: `${isInvalidTitle}${isLabelHiddenTitle}${isReversedTitle}`,
        isInvalid,
        isLabelHidden,
        isReversed,
        hintMessage: 'Hint text',
        validationMessage: 'Validation message',
      });
    });
  });
});

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

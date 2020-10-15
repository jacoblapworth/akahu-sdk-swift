import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIRadio';
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Unchecked',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Unchecked hover state',
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked',
    isDefaultChecked: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked hover state',
    isDefaultChecked: true,
    hoverSelector: '.xui-styledcheckboxradio--input',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Disabled',
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Checked and Disabled',
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
    storyTitle: 'is Reversed',
    isReversed: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Hidden Label',
    isLabelHidden: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Inline Group',
    viewports: desktopPlus320,
    isSeries: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Inline Group Reversed',
    isReversed: true,
    isSeries: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Radio Group',
    viewports: desktopPlus320,
    isGroup: true,
    groupProps: {
      label: 'Radio Group',
      hintMessage: 'I am a hint',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is Radio Group Invalid',
    isGroup: true,
    groupProps: {
      label: 'Radio Group',
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

export { storiesWithVariationsKindName, variations };

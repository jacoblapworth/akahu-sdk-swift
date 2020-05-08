import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIIsolationHeader';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Navigation only',
    title: 'Main title',
    secondaryTitle: 'Secondary title',
    navigationIcon: 'cross',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Navigation and actions',
    title: 'Main title',
    secondaryTitle: 'Secondary title',
    supplementaryText: 'Supplementary text',
    navigationIcon: 'cross',
    actionIcon: 'overflow',
    hasActionsPrimaryButton: true,
    hasActionsSecondaryButton: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Jam-packed',
    viewports: desktopPlus320,
    hasAvatar: true,
    hasTag: true,
    navigationIcon: 'cross',
    actionIcon: 'overflow',
    title:
      "Every time I see those chocka full boxes of fluffies it's like Rangitoto Island all over again aye, you're not in Guatemala now.",
    secondaryTitle:
      'To find the true meaning of life, one must start cooking up a feed with the lamington, mate.',
    supplementaryText: 'You must always blow on the pie. Safer communities together.',
    hasActionsPrimaryButton: true,
    hasActionsSecondaryButton: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Fixed position',
    title: 'Main title',
    secondaryTitle: 'Secondary Title',
    navigationIcon: 'cross',
    isPositionFixed: true,
    selectors: '.xui-container',
    misMatchThreshold: 0.4,
  },
];

export { storiesWithVariationsKindName, variations };

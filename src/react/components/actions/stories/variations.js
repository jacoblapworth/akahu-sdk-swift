import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIActions';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    actionsCount: 1,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default with two actions',
    actionsCount: 2,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear',
    isLinear: true,
    actionsCount: 1,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear with two actions',
    isLinear: true,
    actionsCount: 2,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default with split button and a dropdown',
    actionsCount: 2,
    hasSplitButton: true,
    hasDropdown: true,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default with empty split button',
    actionsCount: 2,
    hasSplitButton: true,
    viewports: desktopPlus320,
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

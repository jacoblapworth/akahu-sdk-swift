import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIActions';
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
];

export { storiesWithVariationsKindName, variations };

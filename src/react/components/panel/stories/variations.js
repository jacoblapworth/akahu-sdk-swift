import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIPanel';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `- simple`,
    type: 'panel',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with all options`,
    viewports: desktopPlus320,
    type: 'panel-sidebar',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `with header node`,
    type: 'panel-header-node',
  },
];

export { storiesWithVariationsKindName, variations };

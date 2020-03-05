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
];

export { storiesWithVariationsKindName, variations };

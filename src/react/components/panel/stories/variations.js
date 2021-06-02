import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIPanel';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

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

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

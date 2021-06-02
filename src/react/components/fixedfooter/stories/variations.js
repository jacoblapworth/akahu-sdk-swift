import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIFixedFooterWIP';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with contentblock stuff',
    childContent: 'contentBlock',
    viewports: desktopPlus320,
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

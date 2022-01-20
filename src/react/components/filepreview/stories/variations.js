import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIFilePreview';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'in a side container',
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

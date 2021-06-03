import { commonViewports, desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIIntroBanner';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer',
    footer: true,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with illustration',
    illustration: true,
    viewports: [...desktopPlus320, commonViewports[2]],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer and illustration',
    illustration: true,
    footer: true,
    viewports: [...desktopPlus320, commonViewports[2]],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer and video illustration',
    video: true,
    illustration: true,
    footer: true,
    viewports: [...desktopPlus320, commonViewports[2]],
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

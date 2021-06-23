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
    storyTitle: 'with long title and button text',
    headerTitle:
      'Learn how to manage your inventory learn how to manage your inventory learn how to manage your inventory learn how to manage your inventory',
    dismissButtonText: 'Hidehidehidehidehidehidehidehidehidehide',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer',
    hasFooter: true,
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with illustration',
    hasIllustration: true,
    viewports: [...desktopPlus320, commonViewports[2]],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with illustration and long title and button text',
    hasIllustration: true,
    headerTitle:
      'Learn how to manage your inventory learn how to manage your inventory learn how to manage your inventory learn how to manage your inventory',
    dismissButtonText: 'Hidehidehidehidehidehidehidehidehidehide',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer and illustration',
    hasIllustration: true,
    hasFooter: true,
    viewports: [...desktopPlus320, commonViewports[2]],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer and video illustration',
    hasVideo: true,
    hasIllustration: true,
    hasFooter: true,
    viewports: [...desktopPlus320, commonViewports[2], commonViewports[6]],
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

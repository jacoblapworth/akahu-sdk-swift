import { desktopPlus320 } from '../../../stories/helpers/viewports';

const modalSizes = require('../constants').modalSizes;

const storiesWithKnobsKindName = 'Components/XUIModal';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const sizes = Object.keys(modalSizes).map(size => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `size ${size}`,
  header: true,
  footer: true,
  size,
  viewports: size === 'xlarge' || size === 'fullscreen' ? desktopPlus320 : undefined,
}));

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'full modal',
    header: true,
    footer: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with header',
    header: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with footer',
    footer: true,
  },
  ...sizes,
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

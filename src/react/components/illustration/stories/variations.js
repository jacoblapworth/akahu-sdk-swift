import { desktopPlus320 } from '../../../stories/helpers/viewports';

const { sizeClasses } = require('../private/constants');

const storiesWithKnobsKindName = 'Components/XUIIllustration';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const storyVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'custom height',
    height: 200,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'custom padding',
    padding: 0,
    size: 'medium',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'custom height and padding',
    height: 200,
    padding: 20,
  },
];

const sizeVariations = Object.keys(sizeClasses).map(size => ({
  storyKind: storiesWithVariationsKindName,
  storyTitle: `${size} illustration`,
  viewports: desktopPlus320,
  size,
}));

const variations = [...sizeVariations, ...storyVariations];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

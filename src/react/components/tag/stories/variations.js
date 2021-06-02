import { desktopPlus320 } from '../../../stories/helpers/viewports';

const { sizes, variants } = require('../private/constants');

const storiesWithKnobsKindName = 'Components/XUITag';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variantVariations = Object.keys(variants).map(variant => ({
  children: 'Tag content',
  storyKind: storiesWithVariationsKindName,
  storyTitle: `With a ${variant} variant`,
  variant,
}));

const sizeVariations = Object.keys(sizes).map(size => ({
  children: 'Tag content',
  storyKind: storiesWithVariationsKindName,
  storyTitle: `With a ${size} size`,
  size,
}));

const variations = [
  ...variantVariations,
  ...sizeVariations,
  {
    children: 'Located in another part of the world with variable time zones',
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long content',
    viewports: desktopPlus320,
  },
  {
    children: 'Located in another part of the world with variable time zones',
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long content truncated',
  },
  {
    children: 'Z',
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with short content',
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations };

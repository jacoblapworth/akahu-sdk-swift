import { desktopPlus320 } from '../../../stories/helpers/viewports';
import NOOP from '../../helpers/noop';

const { sizes, variants } = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUITag';

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

const longContent = {
  children: 'Located in another part of the world with variable time zones',
  storyKind: storiesWithVariationsKindName,
  storyTitle: 'with long content',
  viewports: desktopPlus320,
};

const shortContent = {
  children: 'Z',
  storyKind: storiesWithVariationsKindName,
  storyTitle: 'with short content',
  viewports: desktopPlus320,
};

module.exports = {
  storiesWithVariationsKindName,
  variations: [...variantVariations, ...sizeVariations, longContent, shortContent],
  NOOP,
};

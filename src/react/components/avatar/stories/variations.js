import { desktopPlus320 } from '../../../stories/helpers/viewports';

const constants = require('../constants');

const sizes = Object.keys(constants.sizeClassNames);

const storiesWithVariationsKindName = 'Instances/XUIAvatar';

const avatarVariations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with value',
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with value and identifier',
    identifier: 'random id',
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with image',
    imageUrl:
      'https://i.picsum.photos/id/1033/100/100.jpg?hmac=tomT-dDv5vivqHh5P2NCXMYcsD8G3D4-hAqxbdQ7O2c',
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with broken image, no id',
    imageUrl: 'https://xui.xero.com/static/broken-path.jpg',
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'variant business',
    value: 'business',
    variant: 'business',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `standard sizes`,
    sizes,
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `business sizes`,
    sizes,
    variant: 'business',
    value: 'value',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped avatars',
    value: 'value',
    grouped: true,
    avatarLength: 3,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped max length',
    value: 'value',
    grouped: true,
    avatarLength: 5,
    maxAvatars: 3,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped business',
    value: 'value',
    grouped: true,
    variant: 'business',
    avatarLength: 3,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped business max length',
    value: 'value',
    grouped: true,
    variant: 'business',
    avatarLength: 5,
    maxAvatars: 3,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped avatars many sizes',
    viewports: desktopPlus320,
    value: 'value',
    grouped: true,
    sizes,
    avatarLength: 20,
    maxAvatars: 10,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'grouped avatars many sizes business',
    viewports: desktopPlus320,
    value: 'value',
    grouped: true,
    sizes,
    variant: 'business',
    avatarLength: 20,
    maxAvatars: 10,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: `color variants`,
    colors: true,
  },
];

export { avatarVariations as variations, storiesWithVariationsKindName };

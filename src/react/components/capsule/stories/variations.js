import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUICapsule';
const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    href: 'http://www.xero.com',
    value: 'Capsule',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'not interactive but valid',
    value: 'Capsule',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is invalid',
    isValid: false,
    isLink: false,
    value: 'Invalid capsule',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with long content',
    viewports: desktopPlus320,
    value: 'Located in another part of the world with variable time zones',
  },
];

export { storiesWithVariationsKindName, variations };

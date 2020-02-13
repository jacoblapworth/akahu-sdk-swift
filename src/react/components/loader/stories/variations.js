const constants = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUILoader';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with default layout',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'without default layout',
    defaultLayout: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with retain layout',
    retainLayout: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with inverted',
    isInverted: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with sizes',
    defaultLayout: false,
    sizes: Object.keys(constants.sizeClassNames),
  },
];

export { storiesWithVariationsKindName, variations };

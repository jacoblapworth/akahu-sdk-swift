import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIProgressIndicator';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const baseProps = {
  id: 'myCustomProgressId',
  total: 5,
  progress: 3,
};
const variations = [
  // Linear:

  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear standard',
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear standard - very short',
    progress: 4,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear segments',
    isSegmented: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear standard thickness',
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear segments thickness',
    isSegmented: true,
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear standard thickness (zero)',
    thickness: 0,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear segment dots',
    isSegmented: true,
    hasSegmentDots: true,
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear overflow standard',
    progress: 6,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear overflow segments',
    progress: 6,
    isSegmented: true,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear soft error',
    isSoftError: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear grow layout',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear grow (minimal thickness)',
    isGrow: true,
    thickness: 10,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear grow (exaggerated thickness)',
    isGrow: true,
    thickness: 99999,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'linear tooltip',
    hasToolTip: true,
  },

  // Circular:

  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular standard',
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular segments',
    isSegmented: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular standard thickness',
    thickness: 8,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular segments thickness',
    isSegmented: true,
    thickness: 5,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular standard (zero thickness)',
    thickness: 0,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular standard (exaggerated thickness)',
    thickness: 99999,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular overflow standard',
    progress: 6,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular overflow segments',
    progress: 6,
    isSegmented: true,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular soft error',
    isSoftError: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular hard error',
    isHardError: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular custom hard error',
    isHardError: true,
    hardErrorAlert: 'S',
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular custom (icon) hard error',
    isHardError: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular completion alert',
    progress: 5,
    isAlertOnComplete: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular grow layout',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular custom content',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular tooltip',
    hasToolTip: true,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular multiline',
    viewports: desktopPlus320,
    progress: 3,
  },
  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'circular multiline completion alert',
    viewports: desktopPlus320,
    progress: 5,
    isAlertOnComplete: true,
  },

  // Color:

  {
    ...baseProps,
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'color combinations',
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations, baseProps };

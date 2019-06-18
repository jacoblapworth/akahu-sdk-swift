import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storyKind = 'Instances/XUIProgressIndicator';
const baseProps = {
  id: 'myCustomProgressId',
  total: 5,
  progress: 3,
};
const variations = [
  // Linear:

  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear standard',
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear segments',
    isSegmented: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear standard thickness',
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear segments thickness',
    isSegmented: true,
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear standard thickness (zero)',
    thickness: 0,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear segment dots',
    isSegmented: true,
    hasSegmentDots: true,
    thickness: 30,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear overflow standard',
    progress: 6,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear overflow segments',
    progress: 6,
    isSegmented: true,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear soft error',
    isSoftError: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear grow layout',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear grow (minimal thickness)',
    isGrow: true,
    thickness: 10,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear grow (exaggerated thickness)',
    isGrow: true,
    thickness: 99999,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'linear tooltip',
    hasToolTip: true,
  },

  // Circular:

  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular standard',
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular segments',
    isSegmented: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular standard thickness',
    thickness: 8,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular segments thickness',
    isSegmented: true,
    thickness: 5,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular standard (zero thickness)',
    thickness: 0,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular standard (exaggerated thickness)',
    thickness: 99999,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular overflow standard',
    progress: 6,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular overflow segments',
    progress: 6,
    isSegmented: true,
    isOverflow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular soft error',
    isSoftError: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular hard error',
    isHardError: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular custom hard error',
    isHardError: true,
    hardErrorAlert: 'S',
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular custom (icon) hard error',
    isHardError: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular completion alert',
    progress: 5,
    isAlertOnComplete: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular grow layout',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular custom content',
    isGrow: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular tooltip',
    hasToolTip: true,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular multiline',
    viewports: desktopPlus320,
    progress: 3,
  },
  {
    ...baseProps,
    storyKind,
    storyTitle: 'circular multiline completion alert',
    viewports: desktopPlus320,
    progress: 5,
    isAlertOnComplete: true,
  },

  // Color:

  {
    ...baseProps,
    storyKind,
    storyTitle: 'color combinations',
  },
];

module.exports = {
  storiesWithVariationsKindName: storyKind,
  variations,
  baseProps,
};

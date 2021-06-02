import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithKnobsKindName = 'Components/XUIControlGroup';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const controlTypes = ['XUITextInput', 'XUIDateInput', 'XUIButton', 'XUIButtonGroup'];

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'default',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'width settings',
    viewports: desktopPlus320,
    groupProps: {
      columnWidths: 'minmax(60px, 10%) minmax(60px, 200px) minmax(80px, 1fr)',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'locked vertical',
    viewports: desktopPlus320,
    groupProps: {
      isLockedVertical: true,
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'label lengths',
    viewports: desktopPlus320,
    groupProps: {
      isBottomAligned: true,
      columnWidths: 'minmax(60px, 10%) minmax(60px, 200px) minmax(80px, 1fr)',
      swapAtBreakpoint: 'medium',
    },
    itemProps: [
      {
        isLabelHidden: false,
        label: 'Here is a long label that will surely wind up wrapping over several lines',
      },
      {
        isLabelHidden: false,
        label: 'Short label',
      },
      {
        isLabelHidden: false,
        label: 'Short label again',
      },
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'group validation',
    viewports: desktopPlus320,
    groupProps: {
      columnWidths: 'minmax(60px, 10%) minmax(60px, 200px) minmax(80px, 1fr)',
      isInvalid: true,
      validationMessage: 'Here is a long validation message that will surely span multiple inputs',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'individual validation',
    viewports: desktopPlus320,
    groupProps: {
      columnWidths: 'minmax(60px, 10%) minmax(60px, 200px) minmax(80px, 1fr)',
    },
    itemProps: [
      {},
      {
        isInvalid: true,
        validationMessage:
          'Here is a long validation message that will surely wind up wrapping over several lines',
      },
      {},
    ],
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with textinput sideelements',
    viewports: desktopPlus320,
    groupProps: {
      swapAtBreakpoint: 'medium',
    },
    itemProps: [
      {
        hasSideElements: true,
      },
      {},
      {
        hasSideElements: true,
      },
    ],
  },
];

controlTypes.forEach(type =>
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `grouped ${type}`,
    viewports: desktopPlus320,
    type,
    groupProps: { swapAtBreakpoint: 'small' },
  }),
);

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations, controlTypes };

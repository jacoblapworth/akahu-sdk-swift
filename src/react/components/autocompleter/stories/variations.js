import NOOP from '../../helpers/noop';
import { fixedWidthDropdownSizes } from '../../dropdown/private/constants';
import { desktopPlus320 } from '../../../stories/helpers/viewports';

const storiesWithVariationsKindName = 'Instances/XUIAutocompleter';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'SecondarySearch',
    storyType: 'XUIAutocompleterSecondarySearch',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'looks like an input',
    openDrawer: false,
    isInputLabelHidden: false,
    inputId: 'test_input_id',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with placeholders',
    placeholder: 'I am a placeholder',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'shows loading when passed loading prop and dropdown is open',
    openDrawer: true,
    isLoading: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'when open shows drawer',
    openDrawer: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with validation message and label',
    openDrawer: true,
    isInputLabelHidden: false,
    hintMessage: 'This is a hint',
    inputProps: {
      id: 'test_input_id',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'shows a pill when an item is selected',
    selectedPeople: 1,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'is disabled',
    isDisabled: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'no drawer footer',
    openDrawer: true,
    noDrawerFooter: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with wrapping pills',
    selectedPeople: 6,
    placeholder: 'Placeholder text',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with non-wrapping pills',
    selectedPeople: 6,
    disableWrapPills: true,
    placeholder: 'Placeholder text',
    viewports: desktopPlus320,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with empty state',
    storyType: 'XUIAutocompleterEmptyState',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with empty state and custom props',
    storyType: 'XUIAutocompleterEmptyState',
    iconProps: { color: 'green' },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with empty state and custom icon',
    storyType: 'XUIAutocompleterEmptyState',
    iconComponent: true,
  },
];

Object.keys(fixedWidthDropdownSizes).map(dropdownSize =>
  variations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `shows a ${dropdownSize} dropdown`,
    openDrawer: true,
    dropdownSize,
  }),
);

export { variations, NOOP, storiesWithVariationsKindName, fixedWidthDropdownSizes };

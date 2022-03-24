import clockIcon from '@xero/xui-icon/icons/clock';
import { desktopPlus320 } from '../../../stories/helpers/viewports';
import { dateInputSuggestedDates, dateRangeInputSuggestedDates } from './helpers/suggestedDates';

const dateInputStoriesWithKnobsKindName = 'Components/XUIDateInput';
const dateInputStoriesWithVariationsKindName = `${dateInputStoriesWithKnobsKindName}/Tests`;
const dateRangeInputStoriesWithKnobsKindName = 'Components/XUIDateRangeInput';
const dateRangeInputStoriesWithVariationsKindName = `${dateRangeInputStoriesWithKnobsKindName}/Tests`;

const dateInputVariations = [
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'default',
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with initial date',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    qaHook: 'qatest',
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with suggested dates',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'empty with suggested dates',
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with suggested dates open',
    suggestedDates: dateInputSuggestedDates,
    isDropdownHidden: false,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'suggested dates with custom icon',
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
    selectDateIcon: clockIcon,
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with min and max range',
    minDate: new Date(2010, 0, 10),
    maxDate: new Date(2010, 5, 15),
    displayedMonth: new Date(2010, 5),
    validationMessage: 'Please correct your input',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with a hint',
    hintMessage: 'Sample hint message',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with an error',
    isInvalid: true,
    validationMessage: 'Please correct your input',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'Disabled',
    isDisabled: true,
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'with specified DatePicker month picker',
    selectedDateDefaultValue: new Date(2020, 5, 10),
    displayedMonth: new Date(2020, 3, 10),
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'small',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    size: 'small',
    inputLabel: 'Start date',
  },
  {
    storyKind: dateInputStoriesWithVariationsKindName,
    storyTitle: 'xsmall',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    size: 'xsmall',
    inputLabel: 'Start date',
  },
];

const dateRangeInputVariations = [
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'default',
    isDateRangeInput: true,
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      inputLabel: 'First date',
    },
    endDateInputConfig: {
      inputLabel: 'Second date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'with suggested dates open',
    suggestedDates: dateRangeInputSuggestedDates,
    isDropdownHidden: false,
    startDateInputConfig: {
      inputLabel: 'First date',
    },
    endDateInputConfig: {
      inputLabel: 'Second date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'without labels',
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 1),
      isDisabled: true,
      inputLabel: '',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 1, 1),
      isDisabled: true,
      inputLabel: '',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'with group label',
    suggestedDates: dateRangeInputSuggestedDates,
    groupConfig: {
      groupLabel: 'Date range',
    },
    startDateInputConfig: {
      inputLabel: 'First date',
    },
    endDateInputConfig: {
      inputLabel: 'Second date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'disabled',
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 1),
      isDisabled: true,
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      isDisabled: true,
      inputLabel: 'Second Date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'across two years',
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
      displayedMonth: new Date(1999, 5, 5),
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
      displayedMonth: new Date(2000, 11, 15),
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'localised',
    suggestedDates: dateRangeInputSuggestedDates,
    locale: 'el',
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
      displayedMonth: new Date(1999, 5, 5),
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
      displayedMonth: new Date(2000, 11, 15),
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'US localised',
    suggestedDates: dateRangeInputSuggestedDates,
    locale: 'en-US',
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
      displayedMonth: new Date(1999, 5, 5),
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
      displayedMonth: new Date(2000, 11, 15),
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'in fixed width container',
    suggestedDates: dateRangeInputSuggestedDates,
    isInFixedContainer: true,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'with no suggested dates',
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'with one error',
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
      isInvalid: true,
      validationMessage: 'Please correct your input',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'with two errors',
    suggestedDates: dateRangeInputSuggestedDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(1999, 5, 5),
      inputLabel: 'First Date',
      isInvalid: true,
      validationMessage: 'Please correct your input',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2000, 11, 15),
      inputLabel: 'Second Date',
      isInvalid: true,
      validationMessage: 'Please correct your input as it seems to be invalid in some way',
    },
    viewports: desktopPlus320,
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'small',
    suggestedDates: dateRangeInputSuggestedDates,
    size: 'small',
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 1),
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 2),
      inputLabel: 'Second Date',
    },
  },
  {
    storyKind: dateRangeInputStoriesWithVariationsKindName,
    storyTitle: 'xsmall',
    suggestedDates: dateRangeInputSuggestedDates,
    size: 'xsmall',
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 1),
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 2),
      inputLabel: 'Second Date',
    },
  },
];

export {
  dateInputStoriesWithKnobsKindName,
  dateInputStoriesWithVariationsKindName,
  dateInputVariations,
  dateRangeInputStoriesWithKnobsKindName,
  dateRangeInputStoriesWithVariationsKindName,
  dateRangeInputVariations,
};

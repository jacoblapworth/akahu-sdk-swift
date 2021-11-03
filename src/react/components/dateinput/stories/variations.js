import clockIcon from '@xero/xui-icon/icons/clock';
import { desktopPlus320 } from '../../../stories/helpers/viewports';
import { dateInputSuggestedDates, dateRangeInputSuggestedDates } from './helpers/suggestedDates';

const storiesWithKnobsKindName = 'Components/XUIDateInput';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default',
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with initial date',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    qaHook: 'qatest',
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With suggested dates',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Empty with suggested dates',
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Suggested dates with custom icon',
    suggestedDates: dateInputSuggestedDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
    selectDateIcon: clockIcon,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With min and max range',
    minDate: new Date(2010, 0, 10),
    maxDate: new Date(2010, 5, 15),
    displayedMonth: new Date(2010, 5),
    validationMessage: 'Please correct your input',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With a hint',
    hintMessage: 'Sample hint message',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With an error',
    isInvalid: true,
    validationMessage: 'Please correct your input',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Disabled',
    isDisabled: true,
    selectedDateDefaultValue: new Date(2021, 0, 1),
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With specified DatePicker month picker',
    selectedDateDefaultValue: new Date(2020, 5, 10),
    displayedMonth: new Date(2020, 3, 10),
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'small',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    size: 'small',
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'xsmall',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    size: 'xsmall',
    inputLabel: 'Start date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default date range',
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range without labels',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with group label',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Disabled date range',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range across two years',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range localised',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range US localised',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'In fixed width container',
    isDateRangeInput: true,
    suggestedDates: dateRangeInputSuggestedDates,
    fixedContainer: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with no suggested dates',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with two errors',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with just one error',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range small',
    isDateRangeInput: true,
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
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range xsmall',
    isDateRangeInput: true,
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

export { variations, storiesWithKnobsKindName, storiesWithVariationsKindName };

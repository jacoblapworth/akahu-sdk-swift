import {
  dateInputConvenienceDates,
  dateRangeInputConvenienceDates,
} from './helpers/convenienceDates';

const storiesWithVariationsKindName = 'Instances/XUIDateInput';

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
  // {
  //   storyKind: storiesWithVariationsKindName,
  //   storyTitle: 'With min and max range',
  // },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With convenience dates',
    selectedDateDefaultValue: new Date(2021, 0, 1),
    convenienceDates: dateInputConvenienceDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Empty with convenience dates',
    convenienceDates: dateInputConvenienceDates,
    inputLabel: 'Start date',
    selectDateLabel: 'Select date',
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
    storyTitle: 'Default date range',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
    startDateInputConfig: {
      inputLabel: 'First date',
    },
    endDateInputConfig: {
      inputLabel: 'Second date',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with group label',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
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
    convenienceDates: dateRangeInputConvenienceDates,
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
    convenienceDates: dateRangeInputConvenienceDates,
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
    convenienceDates: dateRangeInputConvenienceDates,
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
    storyTitle: 'Date range without convenience dates',
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
    convenienceDates: dateRangeInputConvenienceDates,
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
      validationMessage: 'Please correct your input',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Date range with just one error',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
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
];

export { variations, storiesWithVariationsKindName };

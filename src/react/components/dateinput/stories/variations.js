import {
  dateInputConvenienceDates,
  dateRangeInputConvenienceDates,
} from './helpers/convenienceDates';

const storiesWithVariationsKindName = 'Instances/XUIDateInput';

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'with initial date',
    selectedDateDefaultValue: new Date(2020, 1, 20),
    qaHook: 'qatest',
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
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Empty with convenience dates',
    convenienceDates: dateInputConvenienceDates,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With a hint',
    hintMessage: 'Sample hint message',
    selectedDateDefaultValue: new Date(2021, 0, 1),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With an error',
    isInvalid: true,
    validationMessage: 'Please correct your input',
    selectedDateDefaultValue: new Date(2021, 0, 1),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Disabled',
    isDisabled: true,
    selectedDateDefaultValue: new Date(2021, 0, 1),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'With specified DatePicker month picker',
    selectedDateDefaultValue: new Date(2020, 5, 10),
    displayedMonth: new Date(2020, 3, 10),
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Default daterange',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Daterange without labels',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
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
    storyTitle: 'Disabled daterange',
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
    storyTitle: 'Daterange with one missing label',
    isDateRangeInput: true,
    convenienceDates: dateRangeInputConvenienceDates,
    startDateInputConfig: {
      selectedDateDefaultValue: new Date(2021, 0, 1),
      isDisabled: true,
      inputLabel: 'First Date',
    },
    endDateInputConfig: {
      isDisabled: true,
      inputLabel: '',
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'Daterange across two years',
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
];

export { variations, storiesWithVariationsKindName };

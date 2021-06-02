const storiesWithKnobsKindName = 'Components/XUIDatePicker';
const storiesWithVariationsKindName = `${storiesWithKnobsKindName}/Tests`;

const currentMonth0 = new Date('Oct 02 2017 00:00:00 GMT');
const currentMonth1 = new Date(currentMonth0);
currentMonth1.setDate(currentMonth0.getDate() + 4);
const currentMonth2 = new Date(currentMonth0);
currentMonth2.setDate(currentMonth0.getDate() + 8);
const currentMonth3 = new Date(currentMonth0);
currentMonth3.setDate(currentMonth0.getDate() + 12);

const pastMonth = new Date(currentMonth2);
pastMonth.setMonth(currentMonth2.getMonth() - 1);

const nextMonth = new Date(currentMonth2);
nextMonth.setMonth(currentMonth2.getMonth() + 1);

const variations = [
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Single Selected Date',
    selectedDate: currentMonth1,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Selected range with wider min/max',
    minDate: pastMonth,
    maxDate: currentMonth3,
    selectedRange: {
      from: currentMonth0,
      to: currentMonth2,
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Selected range across months with min/max',
    minDate: currentMonth0,
    selectedRange: {
      from: currentMonth3,
      to: nextMonth,
    },
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Hiding Days in Other Months',
    showDaysInOtherMonths: false,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Showing Fixed Number of Weeks',
    showFixedNumberOfWeeks: true,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Weeks Starting on Monday',
    firstDayOfWeek: 1,
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Localised with Language String Only',
    locale: 'es',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Localised with Full Locale String',
    locale: 'fr-CA',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as First Day of Week Determined by Locale',
    locale: 'de',
  },
  {
    storyKind: storiesWithVariationsKindName,
    storyTitle: 'as Right-to-Left Determined by Locale',
    locale: 'ar',
  },
];

export { storiesWithVariationsKindName, storiesWithKnobsKindName, variations, currentMonth0 };

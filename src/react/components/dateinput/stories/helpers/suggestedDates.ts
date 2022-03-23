import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(quarterOfYear);

const defaultToday = new Date(2022, 1, 2).toString();

export const dateInputSuggestedDates = [
  {
    id: 'week',
    text: 'Next week',
    getDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).add(1, 'week').toDate();
    },
    description: '9 Feb 2022',
  },
  {
    id: 'month',
    text: 'Next month',
    getDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).add(1, 'month').toDate();
    },
    description: '2 Mar 2022',
  },
  {
    id: 'year',
    text: 'Next year',
    getDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).add(1, 'year').toDate();
    },
    description: '2 Feb 2023',
  },
];

export const dateRangeInputSuggestedDates = [
  {
    id: 'monthThis',
    text: 'This month',
    getStartDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).startOf('month').toDate();
    },
    getEndDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).endOf('month').toDate();
    },
    description: '1 – 28 Feb 22',
  },
  {
    id: 'quarterThis',
    text: 'This quarter',
    getStartDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).startOf('quarter').toDate();
    },
    getEndDate: () => {
      const today = new Date(defaultToday);

      return dayjs(today).endOf('quarter').toDate();
    },
    description: '1 Jan – 31 Mar 22',
  },
  {
    id: 'financialYearThis',
    text: 'This financial year',
    getStartDate: () => {
      const today = new Date(defaultToday);
      today.setMonth(3);
      today.setDate(1);
      today.setFullYear(today.getFullYear() - 1);

      return today;
    },
    getEndDate: () => {
      const today = new Date(defaultToday);
      today.setMonth(2);
      today.setFullYear(today.getFullYear());
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);

      return today;
    },
    description: '1 Apr 21 – 31 Mar 22',
  },
  {
    id: 'monthLast',
    text: 'Last month',
    getStartDate: () => {
      const today = new Date(defaultToday);
      const lastMonth = dayjs(today).subtract(1, 'month');

      return dayjs(lastMonth).startOf('month').toDate();
    },
    getEndDate: () => {
      const today = new Date(defaultToday);
      const lastMonth = dayjs(today).subtract(1, 'month');

      return dayjs(lastMonth).endOf('month').toDate();
    },
    description: '1 – 31 Jan 22',
  },
  {
    id: 'quarterNext',
    text: 'Last quarter',
    getStartDate: () => {
      const today = new Date(defaultToday);
      const lastQuarter = dayjs(today).subtract(1, 'quarter');

      return dayjs(lastQuarter).startOf('quarter').toDate();
    },
    getEndDate: () => {
      const today = new Date(defaultToday);
      const lastQuarter = dayjs(today).subtract(1, 'quarter');

      return dayjs(lastQuarter).endOf('quarter').toDate();
    },
    description: '1 Oct – 31 Dec 21',
  },
];

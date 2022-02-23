import dayjs from 'dayjs';

export const dateInputSuggestedDates = [
  {
    id: 'week',
    text: 'Next week',
    getDate: () => {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      return today;
    },
    description: '9 Feb 2022',
  },
  {
    id: 'month',
    text: 'Next month',
    getDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      return today;
    },
    description: '2 Mar 2022',
  },
  {
    id: 'jan2019',
    text: 'January 2019',
    getDate: () => new Date(Date.UTC(2019, 0, 10)),
    description: '1 Jan 2019',
  },
];

export const dateRangeInputSuggestedDates = [
  {
    id: 'monthThis',
    text: 'This month',
    getStartDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth());
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth());
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
    description: '1 - 28 Feb 22',
  },
  {
    id: 'quarterThis',
    text: 'This quarter',
    getStartDate: () => {
      const today = new Date();
      today.setMonth(Math.floor(today.getMonth() / 4) * 4);
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(Math.floor(today.getMonth() / 4) * 4 + 3);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
    description: '1 Jan - 31 Mar 22',
  },
  {
    id: 'financialYearThis',
    text: 'This financial year',
    getStartDate: () => {
      const today = new Date();
      today.setMonth(5);
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(4);
      today.setFullYear(today.getFullYear() + 1);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
    description: '1 Apr 21 - 31 Mar 22',
  },
  {
    id: 'monthLast',
    text: 'Last month',
    getStartDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() - 1);
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() - 1);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
    description: '1 - 31 Jan 22',
  },
  {
    id: 'quarterNext',
    text: 'Last quarter',
    getStartDate: () => {
      const today = new Date();
      today.setMonth(Math.floor(today.getMonth() / 4) * 4 - 4);
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(Math.floor(today.getMonth() / 4) * 4 - 1);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
    description: '1 Sep - 31 Dec 21',
  },
];

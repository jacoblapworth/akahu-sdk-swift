import dayjs from 'dayjs';

export const dateInputConvenienceDates = [
  {
    id: 'week',
    text: 'Next week',
    getDate: () => {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      return today;
    },
  },
  {
    id: 'month',
    text: 'Next month',
    getDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      return today;
    },
  },
  {
    id: 'jan2019',
    text: 'January 2019',
    getDate: () => {
      return new Date(Date.UTC(2019, 0, 10));
    },
  },
];

export const dateRangeInputConvenienceDates = [
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
  },
];

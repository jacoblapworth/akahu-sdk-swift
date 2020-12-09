import dayjs from 'dayjs';

export const dateInputConvenienceDates = [
  {
    id: 'week',
    text: 'Next Week',
    getDate: () => {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      return today;
    },
  },
  {
    id: 'month',
    text: 'Next Month',
    getDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 1);
      return today;
    },
  },
];

export const dateRangeInputConvenienceDates = [
  {
    id: 'monthThis',
    text: 'This Month',
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
      today.setMonth(today.getMonth());
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 3);
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
      today.setMonth(today.getMonth());
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 3);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
  },
  {
    id: 'monthLast',
    text: 'Last Month',
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
      today.setMonth(today.getMonth() - 1);
      today.setDate(1);
      return today;
    },
    getEndDate: () => {
      const today = new Date();
      today.setMonth(today.getMonth() + 3);
      const daysInMonth = dayjs(today).daysInMonth();
      today.setDate(daysInMonth);
      return today;
    },
  },
];

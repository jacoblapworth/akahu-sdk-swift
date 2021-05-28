import { ns } from '../../helpers/xuiClassNamespace';

export const baseClassName = `${ns}-datepicker`;

export const customClassNames = {
  container: `${baseClassName}`,
  interactionDisabled: `${ns}-is-disabled`,
  navBar: `${baseClassName}--header`,
  navButtonPrev: `${baseClassName}--arrow-icon`,
  navButtonNext: `${baseClassName}--arrow-icon`,
  month: `${baseClassName}--body`,
  caption: '',
  weekdays: '',
  weekdaysRow: `${baseClassName}--weekdays`,
  weekday: `${baseClassName}--weekday`,
  weekNumber: '',
  body: '',
  week: `${baseClassName}--week`,
  day: `${baseClassName}--day`,
  today: `${baseClassName}--day-is-today`,
  selected: `${baseClassName}--day-is-selected`,
  outside: `${baseClassName}--day-is-othermonth`,
  disabled: `${baseClassName}--day-is-disabled`,
};

import { ns } from './xuiClassNamespace';

export type Breakpoints = {
  [key: string]: number;
};

const breakpoints: Breakpoints = {
  xsmall: 400,
  small: 600, // $xui-breakpoint-small
  medium: 800, // $xui-breakpoint-medium
  large: 1000, // $xui-breakpoint-large
  xlarge: 1200, // $xui-breakpoint-xlarge
  '2xlarge': 1600, // $xui-breakpoint-xlarge
};

export const widthBaseClass = `${ns}-width`;
export const widthClasses: { [key: string]: string } = {
  xsmall: `${widthBaseClass}-xsmall-up`,
  small: `${widthBaseClass}-small-up`,
  medium: `${widthBaseClass}-medium-up`,
  large: `${widthBaseClass}-large-up`,
  xlarge: `${widthBaseClass}-xlarge-up`,
  '2xlarge': `${widthBaseClass}-2xlarge-up`,
};

export const userBreakpoints = {
  small: breakpoints.small,
  medium: breakpoints.medium,
  large: breakpoints.large,
  xlarge: breakpoints.xlarge,
};

export const handleBreakpoint = (
  width: number,
  breakpoint: string,
  customBreakpoints?: Breakpoints,
) => {
  const breakpointToUse = customBreakpoints != null ? customBreakpoints : breakpoints;

  return width >= breakpointToUse[breakpoint];
};

export const getWidthClassesFromState = (stateObj: { [key: string]: boolean }) => {
  if (!stateObj) return [];
  return Object.keys(widthClasses).map(width => stateObj[width] && widthClasses[width]);
};

export const getWidthClassesFromWidth = (width?: number) => {
  if (!width) return [];

  const widthStateObj = Object.keys(breakpoints).reduce(
    (accumulator, breakpoint) => ({
      ...accumulator,
      [breakpoint]: handleBreakpoint(width, breakpoint),
    }),
    {},
  );

  return getWidthClassesFromState(widthStateObj);
};

export default breakpoints;

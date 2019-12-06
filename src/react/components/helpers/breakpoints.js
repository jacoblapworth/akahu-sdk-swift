import { ns } from './xuiClassNamespace';

const breakpoints = {
  xsmall: 400,
  small: 600, // $xui-breakpoint-small
  medium: 800, // $xui-breakpoint-medium
  large: 1000, // $xui-breakpoint-large
  xlarge: 1200, // $xui-breakpoint-xlarge
  '2xlarge': 1600, // $xui-breakpoint-xlarge
};

export const widthBaseClass = `${ns}-width`;
export const widthClasses = {
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

export default breakpoints;

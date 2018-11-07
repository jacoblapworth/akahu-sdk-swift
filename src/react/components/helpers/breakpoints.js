import { ns } from './xuiClassNamespace';

const breakpoints = {
	narrow: 520,
	medium: 940,
	wide: 1160,
};

export const widthBaseClass = `${ns}-width`;
export const widthClasses = {
	xsmall: `${widthBaseClass}-xsmall-up`,
	small: `${widthBaseClass}-small-up`,
	medium: `${widthBaseClass}-medium-up`,
	large: `${widthBaseClass}-large-up`,
	xlarge: `${widthBaseClass}-xlarge-up`,
};

export default breakpoints;

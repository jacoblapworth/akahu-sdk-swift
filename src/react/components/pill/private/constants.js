import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-pill`;

export const sizeClasses = {
	xsmall: `${baseClass}-xsmall`,
	small: `${baseClass}-small`,
	standard: '',
};

export const childSizeClassMap = {
	xsmall: '2xsmall',
	small: 'xsmall',
	standard: 'small',
};

export const childSizes = Object.keys(childSizeClassMap).map(size => childSizeClassMap[size]);

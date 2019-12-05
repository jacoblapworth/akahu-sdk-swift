import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-pill`;

export const sizeClasses = {
  small: `${baseClass}-small`,
  medium: `${baseClass}-medium`,
};

export const childSizeClassMap = {
  small: 'xsmall',
  medium: 'small',
};

export const childSizes = Object.keys(childSizeClassMap).map(size => childSizeClassMap[size]);

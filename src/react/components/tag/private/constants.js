import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-tag`;

export const variants = {
  neutral: `${baseClass}-neutral`,
  positive: `${baseClass}-positive`,
  negative: `${baseClass}-negative`,
  warning: `${baseClass}-warning`,
  standard: '',
};

export const sizes = {
  medium: `${baseClass}-medium`,
  small: `${baseClass}-small`,
  xsmall: `${baseClass}-xsmall`,
};

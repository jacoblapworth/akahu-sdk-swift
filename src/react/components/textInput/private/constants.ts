import { ns } from '../../helpers/xuiClassNamespace';

export const inputBaseClass = `${ns}-textinput`;
export const sideElementBaseClass = `${inputBaseClass}--sideelement`;

export const baseSizeClasses = {
  xsmall: `${inputBaseClass}-xsmall`,
  small: `${inputBaseClass}-small`,
  medium: `${inputBaseClass}-medium`,
};

export const inputSizeClasses = {
  xsmall: `${inputBaseClass}--input-xsmall`,
  small: `${inputBaseClass}--input-small`,
  medium: `${inputBaseClass}--input-medium`,
};

export const typeClasses = {
  text: `${sideElementBaseClass}-text`,
  icon: `${sideElementBaseClass}-icon`,
  button: `${sideElementBaseClass}-button`,
  avatar: `${sideElementBaseClass}-avatar`,
  pill: `${sideElementBaseClass}-pill`,
};
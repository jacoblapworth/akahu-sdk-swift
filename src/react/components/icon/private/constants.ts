import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-icon`;
export const wrapperClass = `${baseClass}wrapper`;

// Wrappers for legacy compatibility
export const wrapperSizeClasses = {
  xsmall: `${wrapperClass}-xsmall`,
  small: `${wrapperClass}-small`,
  medium: `${wrapperClass}-medium`,
  large: `${wrapperClass}-large`,
  xlarge: `${wrapperClass}-xlarge`,
};

// We don’t want an icon scaling any smaller than its ‘natural’ size
// due to legibility concerns
export const iconSizeMultipliers = {
  xsmall: 1,
  small: 1,
  medium: 1,
  large: 4 / 3,
  xlarge: 2,
};

export const rotationClasses = {
  0: ``,
  90: `${baseClass}-rotate-90`,
  180: `${baseClass}-rotate-180`,
  270: `${baseClass}-rotate-270`,
};

export const colorClasses = {
  black: `${baseClass}-color-black`,
  'black-muted': `${baseClass}-color-black-muted`,
  'black-faint': `${baseClass}-color-black-faint`,
  white: `${baseClass}-color-white`,
  white_muted: `${baseClass}-color-white-muted`,
  white_faint: `${baseClass}-color-white-faint`,
  blue: `${baseClass}-color-blue`,
  'dark-blue': `${baseClass}-color-dark-blue`,
  green: `${baseClass}-color-green`,
  red: `${baseClass}-color-red`,
  orange: `${baseClass}-color-orange`,
  yellow: `${baseClass}-color-yellow`,
  mint: `${baseClass}-color-mint`,
  turquoise: `${baseClass}-color-turquoise`,
  violet: `${baseClass}-color-violet`,
  grape: `${baseClass}-color-grape`,
  pink: `${baseClass}-color-pink`,
  file_spreadsheet: `${baseClass}-color-file-spreadsheet`,
  file_pdf: `${baseClass}-color-file-pdf`,
};

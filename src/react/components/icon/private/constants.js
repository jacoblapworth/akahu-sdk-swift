import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-icon`;
export const wrapperClass = `${baseClass}wrapper`;

// Wrappers for legacy compatibility
export const wrapperSizeClasses = {
  medium: `${wrapperClass}-medium`,
  large: `${wrapperClass}-large`,
  xlarge: `${wrapperClass}-xlarge`,
};

export const iconSizeMultipliers = {
  medium: 1,
  large: 4 / 3,
  xlarge: 2,
};

export const rotationClasses = {
  90: `${baseClass}-rotate-90`,
  180: `${baseClass}-rotate-180`,
  270: `${baseClass}-rotate-270`,
};

/* eslint-disable camelcase */
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
/* eslint-enabled camelcase */

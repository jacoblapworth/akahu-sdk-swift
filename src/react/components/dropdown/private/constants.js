import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-dropdown`;
export const maxWidthDropdownSizes = {
	xsmall: `${baseClass}-xsmall`,
	small: `${baseClass}-small`,
	medium: `${baseClass}-medium`,
	large: `${baseClass}-large`,
};

export const fixedWidthDropdownSizes = {
	xsmall: `${baseClass}-fixed-xsmall`,
	small: `${baseClass}-fixed-small`,
	medium: `${baseClass}-fixed-medium`,
	large: `${baseClass}-fixed-large`,
};

export const dropdownPositionOptions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

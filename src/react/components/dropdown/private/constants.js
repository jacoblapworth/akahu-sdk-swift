import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-dropdown`;
export const maxWidthDropdownSizes = {
	small: `${baseClass}-small`,
	medium: `${baseClass}-medium`,
	large: `${baseClass}-large`,
	xlarge: `${baseClass}-xlarge`,
};

export const fixedWidthDropdownSizes = {
	small: `${baseClass}-fixed-small`,
	medium: `${baseClass}-fixed-medium`,
	large: `${baseClass}-fixed-large`,
	xlarge: `${baseClass}-fixed-xlarge`,
};

export const dropdownPositionOptions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

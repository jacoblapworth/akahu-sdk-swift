import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-toggle`;

/** @private colorMap - Map colors to classes */
export const colorMap = {
	inverted: `${baseClass}-inverted`,
	standard: '',
};

/** @private sizeMap - Map sizes to classes */
export const sizeMap = {
	medium: `${baseClass}-medium`,
	small: `${baseClass}-small`,
};

/** @private layoutMap - Map layouts to classes */
export const layoutMap = {
	fullwidth: `${baseClass}-fullwidth-layout`,
};

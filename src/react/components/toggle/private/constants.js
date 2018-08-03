import {ns} from '../../helpers/xuiClassNamespace';
export const baseClass = `${ns}-toggle`;

/** @private colorMap - Map colors to classes */
export const colorMap = {
	inverted: `${baseClass}-inverted`,
	standard: ''
};

/** @private variantMap - Map variants to classes */
export const variantMap = {
	small: `${baseClass}-small`
};

/** @private layoutMap - Map layouts to classes */
export const layoutMap = {
	fullwidth: `${baseClass}-fullwidth-layout`,
};

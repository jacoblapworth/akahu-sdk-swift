import { ns } from '../../helpers/xuiClassNamespace';

export const baseClassName = 'xui-button';

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const SizeClassNames = {
	'xsmall': `${ns}-button-xsmall`,
	'small': `${ns}-button-small`,
	'full-width': `${ns}-button-fullwidth`,
	'full-width-mobile': `${ns}-button-fullwidth-layout`,
};

/**
 * @public
 * Map of sizes to XUI Classes properties for icons
 */
export const IconSizeClassNames = {
	xsmall: `${ns}-button-icon-xsmall`,
	small: `${ns}-button-icon-small`,
	standard: '',
};

/**
 * @public
 * Map of variants to class names
 */
export const VariantClassNames = {
	'standard': `${ns}-button-standard`,
	'primary': `${ns}-button-main`,
	'create': `${ns}-button-create`,
	'link': `${ns}-button-borderless-main`,
	'negative': `${ns}-button-negative`,
	'borderless-standard': `${ns}-button-borderless-standard`,
	'borderless-primary': `${ns}-button-borderless-main`,
	'borderless-create': `${ns}-button-borderless-create`,
	'borderless-negative': `${ns}-button-borderless-negative`,
	'borderless-inverted': `${ns}-button-borderless-inverted`,
	'borderless-muted': `${ns}-button-borderless-muted`,
	'icon': `${ns}-button-icon`,
	'icon-inverted': `${ns}-button-icon xui-button-icon-inverted`,
	'unstyled': '',
};

/**
 * @public
 * Map of button types to class names
 */
export const ButtonTypes = {
	submit: 'submit',
	button: 'button',
	reset: 'reset',
};

import { ns } from '../../helpers/xuiClassNamespace';

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const SizeClassNames = {
	'small': `${ns}-button-small`,
	'full-width': `${ns}-u-fullwidth`,
	'full-width-mobile': `${ns}-button-fullwidth-layout`,
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
	'icon-large': `${ns}-button-icon ${ns}-button-icon-large`,
	'icon-inverted': `${ns}-button-icon ${ns}-button-icon-inverted`,
	'icon-inverted-large': `${ns}-button-icon ${ns}-button-icon-inverted ${ns}-button-icon-large`,
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

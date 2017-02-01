import Classes from 'xui-css-classes';

const ButtonClasses = Classes.Button;
/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const sizeClassNames = {
	'small': ButtonClasses.SMALL,
	'full-width': Classes.Utility.FULL_WIDTH,
	'full-width-mobile': ButtonClasses.FULL_WIDTH
};

/**
 * @public
 * Map of variants to class names
 */
export const variantClassNames = {
	'primary': ButtonClasses.MAIN,
	'create': ButtonClasses.CREATE,
	'link': ButtonClasses.LINK,
	'negative': ButtonClasses.NEGATIVE,
	'standard': ButtonClasses.STANDARD,
	'icon':	ButtonClasses.Icon.BASE,
	'icon-inverted': ButtonClasses.Icon.INVERTED,
	'unstyled': ''
};
/**
 * @public
 * Map of HTML types to class names
 */
export const buttonHTMLTypes = {
	BUTTON: 'button',
	LINK: 'a'
};

/**
 * @public
 * Map of button types to class names
 */

export const buttonTypes = {
	SUBMIT: 'submit',
	BUTTON: 'button',
	RESET: 'reset'
};



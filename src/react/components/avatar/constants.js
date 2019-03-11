import { ns } from '../helpers/xuiClassNamespace';

const avatarBaseClass = `${ns}-avatar`;

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const sizeClassNames = {
	'2xsmall': `${avatarBaseClass}-2xsmall`,
	'xsmall': `${avatarBaseClass}-xsmall`,
	'small': `${avatarBaseClass}-small`,
	'medium': '',
	'large': `${avatarBaseClass}-large`,
	'xlarge': `${avatarBaseClass}-xlarge`,
};

/**
 * @public
 * Map of core class names
 */
export const classNames = {
	base: avatarBaseClass,
	counter: `${avatarBaseClass}-counter`,
	group: `${avatarBaseClass}group`,
};

/**
 * @public
 * Map of color classes
 */
export const colorClassNames = [];
for (let i = 1; i <= 10; i += 1) {
	colorClassNames.push(`${avatarBaseClass}-color-${i}`);
}

/**
 * @public
 * Map of variants to class names
 */
export const variantClassNames = {
	business: `${avatarBaseClass}-business`,
};

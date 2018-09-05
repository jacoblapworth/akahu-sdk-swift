import { ns } from '../helpers/xuiClassNamespace';

const avatarBaseClass = `${ns}-avatar`;
const smallVariation = 'small';
const largeVariation = 'large';

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const sizeClassNames = {
	'xsmall': `${avatarBaseClass}-x${smallVariation}`, // xui-avatar-xsmall
	'small': `${avatarBaseClass}-${smallVariation}`, // xui-avatar-small
	'medium': '',
	'large': `${avatarBaseClass}-${largeVariation}`, // xui-avatar-large
	'xlarge': `${avatarBaseClass}-x${largeVariation}`, // xui-avatar-xlarge
	'2xlarge': `${avatarBaseClass}-2x${largeVariation}`, // xui-avatar-2xlarge
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

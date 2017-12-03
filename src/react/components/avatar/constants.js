const avatarBaseClass = 'xui-avatar';
const smallVariation = 'small';
const largeVariation = 'large';

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
const sizeClassNames = {
	xsmall: `${avatarBaseClass}-x${smallVariation}`, // xui-avatar-xsmall
	small: `${avatarBaseClass}-${smallVariation}`, // xui-avatar-small
	medium: '',
	large: `${avatarBaseClass}-${largeVariation}`, // xui-avatar-large
	xlarge: `${avatarBaseClass}-x${largeVariation}`, // xui-avatar-xlarge
	["2xlarge"]: `${avatarBaseClass}-2x${largeVariation}` // xui-avatar-2xlarge
};

/**
 * @public
 * Map of core class names
 */
const classNames = {
	base: avatarBaseClass,
	counter: `${avatarBaseClass}-counter`,
	group: `${avatarBaseClass}group`
};

/**
 * @public
 * Map of color classes
 */
const colorClassNames = [];
for(let i = 1; i <= 10; i++) {
	colorClassNames.push(`${avatarBaseClass}-color-${i}`);
}

/**
 * @public
 * Map of variants to class names
 */
const variantClassNames = {
	business: `${avatarBaseClass}-business`
};

module.exports = {
	variantClassNames,
	colorClassNames,
	classNames,
	sizeClassNames
}

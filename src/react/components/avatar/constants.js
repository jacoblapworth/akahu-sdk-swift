/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const sizeClassNames = {
	xsmall: 'xui-avatar-xsmall',
	small: 'xui-avatar-small',
	medium: '',
	large: 'xui-avatar-large',
	xlarge: 'xui-avatar-xlarge',
	xxlarge: 'xui-avatar-xxlarge'
};

/**
 * @public
 * Map of core class names
 */
export const classNames = {
	base: 'xui-avatar',
	counter: 'xui-avatar-counter',
	group: 'xui-avatargroup'
};

/**
 * @public
 * Map of color classes
 */
export const colorClassNames = [];
for(let i = 1; i <= 10; i++) {
	colorClassNames.push(`xui-avatar-color-${i}`);
}

/**
 * @public
 * Map of variants to class names
 */
export const variantClassNames = {
	business: 'xui-avatar-business'
};

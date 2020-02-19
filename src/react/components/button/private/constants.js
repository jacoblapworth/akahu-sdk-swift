import { ns } from '../../helpers/xuiClassNamespace';

export const baseClassName = `${ns}-button`;

/**
 * @public
 * Map of sizes to XUI Classes properties
 */
export const sizeClassNames = {
  xsmall: `${baseClassName}-xsmall`,
  small: `${baseClassName}-small`,
  medium: `${baseClassName}-medium`,
};

/**
 * @public
 * Map of widths to XUI Classes properties
 */
export const widthClassNames = {
  always: `${baseClassName}-fullwidth`,
  'small-down': `${baseClassName}-fullwidth-layout`,
  never: '',
};

/**
 * @public
 * Map of sizes to XUI Classes properties for icons
 */
export const iconSizeClassNames = {
  xsmall: `${baseClassName}-icon-xsmall`,
  small: `${baseClassName}-icon-small`,
  medium: `${baseClassName}-icon-medium`,
};

/**
 * @public
 * Map of ‘solid’, non-icon button class names
 */
export const standardVariantClassNames = {
  standard: `${baseClassName}-standard`,
  primary: `${baseClassName}-main`,
  create: `${baseClassName}-create`,
  negative: `${baseClassName}-negative`,
};

/**
 * @public
 * Map of icon button class names
 */
export const iconVariantClassNames = {
  icon: `${baseClassName}-icon`,
  'icon-inverted': `${baseClassName}-icon ${baseClassName}-icon-inverted`,
};

/**
 * @public
 * Map of borderless button class names
 */
export const borderlessVariantClassNames = {
  'borderless-standard': `${baseClassName}-borderless-standard`,
  'borderless-primary': `${baseClassName}-borderless-main`,
  'borderless-create': `${baseClassName}-borderless-create`,
  'borderless-negative': `${baseClassName}-borderless-negative`,
  'borderless-inverted': `${baseClassName}-borderless-inverted`,
  'borderless-muted': `${baseClassName}-borderless-muted`,
};

/**
 * @public
 * Map of button variants excluding icon variants
 */
export const textButtonVariants = {
  ...standardVariantClassNames,
  ...borderlessVariantClassNames,
  unstyled: '',
};

/**
 * @public
 * Map of all button variants
 */
export const buttonVariants = {
  ...textButtonVariants,
  ...iconVariantClassNames,
};

/**
 * @public
 * Map of button types to class names
 */
export const buttonTypes = {
  submit: 'submit',
  button: 'button',
  reset: 'reset',
};

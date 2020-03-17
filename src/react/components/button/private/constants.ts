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
 * Map of variants to class names
 */
export const variantClassNames = {
  standard: `${baseClassName}-standard`,
  primary: `${baseClassName}-main`,
  create: `${baseClassName}-create`,
  link: `${baseClassName}-borderless-main`,
  negative: `${baseClassName}-negative`,
  'borderless-standard': `${baseClassName}-borderless-standard`,
  'borderless-primary': `${baseClassName}-borderless-main`,
  'borderless-create': `${baseClassName}-borderless-create`,
  'borderless-negative': `${baseClassName}-borderless-negative`,
  'borderless-inverted': `${baseClassName}-borderless-inverted`,
  'borderless-muted': `${baseClassName}-borderless-muted`,
  icon: `${baseClassName}-icon`,
  'icon-inverted': `${baseClassName}-icon ${baseClassName}-icon-inverted`,
  unstyled: '',
};

export type TextButtonVariants = Exclude<keyof typeof variantClassNames, 'icon' | 'icon-inverted'>;

/**
 * @public
 * Array of button variants excluding icon variants.
 */
export const textButtonVariants: TextButtonVariants = Object.keys(variantClassNames).filter(
  name => name.indexOf('icon') !== 0,
) as any;

/**
 * @public
 * Map of button types to class names
 */
export const buttonTypes = {
  submit: 'submit',
  button: 'button',
  reset: 'reset',
};
import * as React from 'react';

import {
  buttonTypes,
  sizeClassNames,
  textButtonVariants,
  widthClassNames,
} from './private/constants';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Modifier for the width of the button.
   */
  fullWidth?: keyof typeof widthClassNames;
  /**
   * The `href` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  href?: string;
  /**
   * Determines if the button is disabled or not.
   */
  isDisabled?: boolean;
  /**
   * If true, sets appropriate `rel` values to prevent new page from having access to
   * `window.opener`. Should be used for links pointing at external sites.
   *
   * Ignored unless `isLink` is `true`.
   */
  isExternalLink?: boolean;
  /**
   * If this button is part of a parent button group.
   */
  isGrouped?: boolean;
  /**
   * Applies inverted styling.
   */
  isInverted?: boolean;
  /**
   * Whether or not to render this button using an anchor tag.
   */
  isLink?: boolean;
  /**
   * If true, shows a loader inside the button and also disables the button to prevent clicking. Can
   * be used in conjunction with `isDisabled` (which also provides a disabled class).
   */
  isLoading?: boolean;
  /**
   * Accessibility label for the `XUILoader`. This is required if the `isLoading` prop is set to
   * `true`.
   */
  loadingLabel?: string;
  /**
   * Use this to specify a min width on the button, when you want to swap to loading states.
   */
  minLoaderWidth?: boolean;
  /**
   * Bind a function to fire when the button is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * A keydown event handler for the button.
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  qaHook?: string;
  /**
   * The `rel` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  rel?: string;
  /**
   * When used with `isLoading` this allows the button to retain children width.
   */
  retainLayout?: boolean;
  /**
   * Modifier for the size of the button. Buttons with `variant` set to `unstyled` will ignore the
   * `size` property.
   */
  size?: keyof typeof sizeClassNames;
  /**
   * The HTML `tabIndex` attribute value.
   */
  tabIndex?: number;
  /**
   * The `target` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  target?: string;
  /**
   * The `title` attribute.
   */
  title?: string;
  /**
   * The type attribute of this button.
   *
   * Ignored unless `isLink` is `false`.
   */
  type?: keyof typeof buttonTypes;
  /**
   * Determines the styling variation to apply.
   */
  variant?: typeof textButtonVariants;
}

type SpreadProps =
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
  | React.ButtonHTMLAttributes<HTMLButtonElement>;

type Props = BaseProps & SpreadProps;

export default class XUIButton extends React.PureComponent<Props> {
  /**
   * Focus the button.
   */
  focus(): void;
  /**
   * Check if the button has focus.
   */
  hasFocus(): boolean;
}

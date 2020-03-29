import * as React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * The `href` attribute to use on the anchor element.
   *
   * Ignored unless `isLink` is `true`.
   */
  href?: string;
  /**
   * Whether or not to render this button using an anchor tag.
   */
  isLink?: boolean;
  /**
   * Whether the element is valid (does not contain invalid formula, etc).
   */
  isValid?: boolean;
  /**
   * Bind a function to fire when the focus moves onto the element.
   */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /**
   * Bind a function to fire when the button is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * Bind a function to fire when the focus moves off the element.
   */
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  /**
   * The target attribute specifies where to open the linked document.
   *
   * Ignored unless `isLink` is `true`.
   */
  target?: string;
}

declare const XUICapsule: React.FunctionComponent<Props>;
export default XUICapsule;

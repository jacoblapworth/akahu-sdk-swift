import React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
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
}
interface LinkProps {
  /**
   * The `href` attribute to use on the anchor element.
   */
  href?: string;
  /**
   * Whether or not to render this button using an anchor tag.
   */
  isLink: true;
  /**
   * The target attribute specifies where to open the linked document.
   */
  target?: string;
}
interface NotLinkProps {
  /**
   * Whether or not to render this button using an anchor tag.
   */
  isLink?: false;
}

type LinkCapsuleProps = LinkProps | NotLinkProps;
type Props = BaseProps & LinkCapsuleProps;

declare const XUICapsule: React.FunctionComponent<Props>;
export default XUICapsule;

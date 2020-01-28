import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * URL of the link.
   */
  href?: string;
  /**
   * Whether or not to render this button using an anchor element.
   */
  isLink?: boolean;
  /**
   * Click event handler for the banner action.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

declare const XUIBannerAction: React.FunctionComponent<Props>;
export default XUIBannerAction;

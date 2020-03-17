import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether to include standard styles on a panel heading.
   *
   * Defaults to `true`.
   */
  hasLayout?: boolean;
  qaHook?: string;
  /**
   * Main element tag type.
   *
   * Defaults to `header`.
   */
  tagName?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

declare const XUIPanelHeading: React.FunctionComponent<Props>;
export default XUIPanelHeading;

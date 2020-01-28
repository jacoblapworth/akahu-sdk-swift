import React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
  /**
   * Main element tag type.
   *
   * Defaults to `footer`.
   */
  tagName?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLElement>;

declare const XUIPanelFooter: React.FunctionComponent<Props>;
export default XUIPanelFooter;

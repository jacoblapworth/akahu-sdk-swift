import * as React from 'react';

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

type SpreadProps = React.HTMLAttributes<HTMLElement>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIPanelFooter: React.FunctionComponent<Props>;
export default XUIPanelFooter;

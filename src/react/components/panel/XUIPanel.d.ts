import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * The footer for a panel. We recommend `XUIPanelFooter`.
   */
  footer?: React.ReactNode;
  /**
   * The header for a panel. We recommend `XUIPanelHeading`.
   */
  heading?: React.ReactNode;
  qaHook?: string;
  /**
   * A node which will be wrapped and rendered as a panel sidebar.
   */
  sidebar?: React.ReactNode;
  /**
   * Main element tag type, for semantic purposes (eg. `main` or `aside`).
   *
   * Defaults to `div`.
   */
  tagName?: string;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIPanel: React.FunctionComponent<Props>;
export default XUIPanel;

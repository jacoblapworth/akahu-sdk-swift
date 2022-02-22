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

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIPanelHeading: React.FunctionComponent<Props>;
export default XUIPanelHeading;

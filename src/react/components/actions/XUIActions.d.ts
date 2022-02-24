import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Applies standard layout settings.
   *
   * Defaults to `true`.
   */
  hasLayout?: boolean;
  /**
   * Splits buttons to left and right for a linear flow. Can be combined with `hasLayout`.
   */
  isLinear?: boolean;
  /**
   * `XUIButton` to style as primary. Alternately, pass in all the children.
   */
  primaryAction?: React.ReactNode;
  qaHook?: string;
  /**
   * `XUIButton` to style as secondary.
   */
  secondaryAction?: React.ReactNode;
  /**
   * Wrapper element tag type, for semantic purposes (eg. panel footers).
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

declare const XUIActions: React.FunctionComponent<Props>;
export default XUIActions;

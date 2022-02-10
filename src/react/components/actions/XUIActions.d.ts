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

type SpreadProps = React.HTMLAttributes<HTMLElement>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIActions: React.FunctionComponent<Props>;
export default XUIActions;

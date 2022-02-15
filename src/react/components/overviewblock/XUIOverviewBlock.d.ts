import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the block should have a solid background.
   *
   * Defaults to `true`.
   */
  hasBackground?: boolean;
  /**
   * Whether to show wrapping border on the entire block.
   *
   * Defaults to `true`.
   */
  hasBorder?: boolean;
  /**
   * Applies default layout styling.
   */
  hasLayout?: boolean;
  qaHook?: string;
  /**
   * How to align text, generally, across all sections.
   */
  textAlignment?: 'center' | 'left' | 'right';
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIOverviewBlock: React.FunctionComponent<Props>;
export default XUIOverviewBlock;

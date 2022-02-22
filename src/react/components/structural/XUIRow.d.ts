import * as React from 'react';

import { rowVariants } from './private/constants';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
  /**
   * Type of row to render.
   */
  variant?: keyof typeof rowVariants;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>;

type Props = BaseProps & SpreadProps;

declare const XUIRow: React.FunctionComponent<Props>;
export default XUIRow;

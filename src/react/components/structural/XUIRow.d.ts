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

type SpreadProps = React.HTMLAttributes<HTMLDivElement>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIRow: React.FunctionComponent<Props>;
export default XUIRow;

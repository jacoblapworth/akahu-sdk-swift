import React from 'react';

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

type Props = BaseProps & React.HTMLAttributes<HTMLDivElement>;

declare const XUIRow: React.FunctionComponent<Props>;
export default XUIRow;

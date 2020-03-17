import * as React from 'react';

import { sizeClassNames } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
  /**
   * Modifier for the size of the button.
   */
  size?: keyof typeof sizeClassNames;
}

declare const XUIButtonGroup: React.FunctionComponent<Props>;
export default XUIButtonGroup;

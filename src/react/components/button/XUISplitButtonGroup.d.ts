import * as React from 'react';

import { sizeClassNames } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Determines if the button is disabled or not.
   */
  isDisabled?: boolean;
  qaHook?: string;
  /**
   * Modifier for the size of the split button.
   */
  size?: keyof typeof sizeClassNames;
  /**
   * Determines what the purpose of this button is.
   */
  variant?: 'create' | 'link' | 'negative' | 'main' | 'standard' | 'unstyled';
}

declare const XUISplitButtonGroup: React.FunctionComponent<Props>;
export default XUISplitButtonGroup;

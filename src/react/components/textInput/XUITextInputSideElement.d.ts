import * as React from 'react';

import { typeClasses } from './private/constants';

interface Props {
  /**
   * Vertical alignment of the content
   */
  alignment?: 'top' | 'center' | 'bottom';
  /**
   * The background colour for the side element - should only be used with icons where appropriate
   */
  backgroundColor?: 'twitter ' | 'facebook' | 'linkedin';
  children?: React.ReactNode;
  /**
   * Classes to apply to the container element
   */
  className?: string;
  qaHook?: string;
  /**
   * Type of the contents being used
   */
  type?: keyof typeof typeClasses;
}

export default class XUITextInputSideElement extends React.PureComponent<Props> {}

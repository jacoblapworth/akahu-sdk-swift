import * as React from 'react';

interface Props {
  /**
   * Facility to pass in custom children.
   */
  children?: React.ReactNode;
  /**
   * Adds optional class to wrapping component.
   */
  className?: string;
  /**
   * Adds QA hook to wrapping component.
   */
  qaHook?: string;
}

declare const XUIToastMessage: React.FunctionComponent<Props>;
export default XUIToastMessage;

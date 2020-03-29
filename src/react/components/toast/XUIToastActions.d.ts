import * as React from 'react';

interface Props {
  /**
   * Adds optional class to wrapping component.
   */
  className?: string;
  /**
   * Pass in a `XUIToastAction` as a primary action.
   */
  primaryAction?: React.ReactNode;
  /**
   * Adds QA hook to wrapping component
   */
  qaHook?: string;
  /**
   * Pass in a `XUIToastAction` as a secondary action.
   */
  secondaryAction?: React.ReactNode;
}

declare const XUIToastActions: React.FunctionComponent<Props>;
export default XUIToastActions;

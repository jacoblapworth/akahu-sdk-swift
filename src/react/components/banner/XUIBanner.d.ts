import * as React from 'react';

import sentiments from './private/sentiments';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Title and accessibility label to be applied to the banner close "X" button.
   * This is required if an `onCloseClick` callback prop is provided.
   *
   * Recommended English value: *Close*
   */
  closeButtonLabel?: string;
  /**
   * Defines whether the default layout class should be supplied.
   */
  hasDefaultLayout?: boolean;
  /**
   * Handles the click event for the action.
   */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  qaHook?: string;
  /**
   * Applies a role attribute to the banner element. This will override any component-determined
   * value.
   */
  role?: string;
  /**
   * Alters the banner to show a positive or negative sentiment.
   */
  sentiment?: keyof typeof sentiments;
}

declare const XUIBanner: React.FunctionComponent<Props>;
export default XUIBanner;

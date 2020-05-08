import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';
import sentiments from './private/sentiments';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * Optional prop for users to modify the close icon, if required for localisation.
   * Defaults to the cross icon, if no value is provided.
   */
  closeIcon?: XUIIconData;
  /**
   * Defines whether the default layout class should be supplied.
   */
  defaultLayout?: boolean;
  /**
   * Handles the click event for the action.
   */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  qaHook?: string;
  /**
   * Applies a role attribute to the toast element. This will override any component-determined
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

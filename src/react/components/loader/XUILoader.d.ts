import * as React from 'react';

import { sizeClassNames } from './private/constants';

interface Props {
  /**
   * Adds aria-label to the loader wrapping div.
   *
   * Recommended English value: *Loading*
   */
  ariaLabel: string;
  /**
   * Add additional classes to the loader wrapping div.
   */
  className?: string;
  /**
   * Sets the default layout class on the loader wrapping div.
   *
   * Defaults to `true`.
   */
  defaultLayout?: boolean;
  /**
   * Sets the loader to the inverted colour scheme.
   */
  isInverted?: boolean;
  /**
   * Adds `data-automationid` attribute with qaHook contents to the loader wrapping div.
   */
  qaHook?: string;
  /**
   * Adds the retain layout class, used in combination with buttons. Applying this prop will cause
   * `defaultLayout` prop to be ignored.
   */
  retainLayout?: boolean;
  /**
   * Sets the size of the loader.
   *
   * Defaults to `medium`.
   */
  size?: keyof typeof sizeClassNames;
}

declare const XUILoader: React.FunctionComponent<Props>;
export default XUILoader;

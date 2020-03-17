import * as React from 'react';

import { sizes, variants } from './private/constants';

interface Props {
  children?: React.ReactNode;
  className?: string;
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event.
   */
  debugShowToolTip?: boolean;
  /**
   * Id for tooltip.
   */
  id?: string;
  qaHook?: string;
  /**
   * Size of tag to render.
   */
  size?: keyof typeof sizes;
  /**
   * Type of tag to render.
   */
  variant?: keyof typeof variants;
}

export default class XUITag extends React.PureComponent<Props> {}

import * as React from 'react';

import { Props as XUIIconProps, XUIIconData } from '../icon/XUIIcon';

interface Props extends Partial<XUIIconProps> {
  className?: string;
  /**
   * Optional prop for users to modify the Button caret icon, if required for localisation.
   * Defaults to the caret icon, if no value is provided.
   */
  icon?: XUIIconData;
  qaHook?: string;
}

declare const XUIButtonCaret: React.FunctionComponent<Props>;
export default XUIButtonCaret;

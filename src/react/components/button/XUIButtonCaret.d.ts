import * as React from 'react';

import XUIIcon, { XUIIconData } from '../icon/XUIIcon';

interface Props extends Partial<React.ComponentProps<typeof XUIIcon>> {
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

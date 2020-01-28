import React from 'react';

import { Props as XUIIconProps } from '../icon/XUIIcon';

interface Props extends Partial<XUIIconProps> {
  className?: string;
  qaHook?: string;
}

declare const XUIButtonCaret: React.FunctionComponent<Props>;
export default XUIButtonCaret;

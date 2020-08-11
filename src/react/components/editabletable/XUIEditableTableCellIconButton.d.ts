import * as React from 'react';

import { XUIButtonHTMLAttributes } from '../button/XUIButton';
import XUIIconButton from '../button/XUIIconButton';
import { XUIIconData } from '../icon/XUIIcon';

interface BaseProps {
  cellProps?: object;
  iconReference: XUIIconData;
  onClick?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

type Props = BaseProps &
  Omit<XUIIconButton, 'desc' | 'iconColor' | 'iconSize' | 'role' | 'rotation'> &
  XUIButtonHTMLAttributes;

declare const XUIEditableTableCellIconButton: React.FunctionComponent<Props>;
export default XUIEditableTableCellIconButton;

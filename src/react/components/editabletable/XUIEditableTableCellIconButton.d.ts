import * as React from 'react';

import XUIIconButton from '../button/XUIIconButton';
import { XUIIconData } from '../icon/XUIIcon';

interface BaseProps {
  cellProps?: object;
  iconReference: XUIIconData;
  onClick?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUIIconButton>,
    'desc' | 'iconColor' | 'iconSize' | 'role' | 'rotation'
  >;

declare const XUIEditableTableCellIconButton: React.FunctionComponent<Props>;
export default XUIEditableTableCellIconButton;

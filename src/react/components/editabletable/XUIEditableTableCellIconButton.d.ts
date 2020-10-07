import * as React from 'react';

import { XUIIconButton } from '../../button';
import { XUIIconData } from '../icon/XUIIcon';
import XUIEditableTableCell from './XUIEditableTableCell';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCell>;
  iconReference: XUIIconData;
  onClick?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUIIconButton>,
    'desc' | 'icon' | 'iconColor' | 'iconSize' | 'role' | 'rotation'
  >;

declare const XUIEditableTableCellIconButton: React.FunctionComponent<Props>;
export default XUIEditableTableCellIconButton;

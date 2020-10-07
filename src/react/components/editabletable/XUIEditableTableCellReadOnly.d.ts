import * as React from 'react';

import { XUIEditableTableCell } from '../../editabletable';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCell>;
  children?: React.ReactNode;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;

declare const XUIEditableTableCellReadOnly: React.FunctionComponent<Props>;
export default XUIEditableTableCellReadOnly;

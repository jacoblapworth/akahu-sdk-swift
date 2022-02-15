import * as React from 'react';

import { XUIEditableTableCell } from '../../editabletable';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCell>;
  children?: React.ReactNode;
  /**
   * Aligns the content of the cell on the inline (horizontal) axis.
   */
  inlineAlignment?: 'end' | 'start';
  qaHook?: string;
}

type SpreadProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIEditableTableCellReadOnly: React.FunctionComponent<Props>;
export default XUIEditableTableCellReadOnly;

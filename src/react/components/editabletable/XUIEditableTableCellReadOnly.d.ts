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

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >,
  keyof BaseProps
>;

type Props = BaseProps & SpreadProps;

declare const XUIEditableTableCellReadOnly: React.FunctionComponent<Props>;
export default XUIEditableTableCellReadOnly;

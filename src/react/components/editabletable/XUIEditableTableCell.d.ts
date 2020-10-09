import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;

declare const XUIEditableTableCell: React.FunctionComponent<Props>;
export default XUIEditableTableCell;

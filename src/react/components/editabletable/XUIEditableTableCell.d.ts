import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  inlineAlignment?: 'end' | 'start';
  qaHook?: string;
}

type SpreadProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIEditableTableCell: React.FunctionComponent<Props>;
export default XUIEditableTableCell;

import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
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

declare const XUIEditableTableCell: React.FunctionComponent<Props>;
export default XUIEditableTableCell;

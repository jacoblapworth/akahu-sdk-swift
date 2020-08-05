import * as React from 'react';

interface BaseProps {
  cellProps?: object;
  children?: React.ReactNode;
  qaHook?: string;
}

type Props = BaseProps & React.TableHTMLAttributes<HTMLTableCellElement>;

declare const XUIEditableTableCellReadOnly: React.FunctionComponent<Props>;
export default XUIEditableTableCellReadOnly;

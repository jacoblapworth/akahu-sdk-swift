import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps & React.TableHTMLAttributes<HTMLTableElement>;

declare const XUIEditableTableHead: React.FunctionComponent<Props>;
export default XUIEditableTableHead;

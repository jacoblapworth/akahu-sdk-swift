import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps & React.TableHTMLAttributes<HTMLTableElement>;

declare const XUIEditableTableFoot: React.FunctionComponent<Props>;
export default XUIEditableTableFoot;

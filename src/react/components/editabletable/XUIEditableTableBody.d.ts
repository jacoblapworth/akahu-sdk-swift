import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type Props = BaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;

declare const XUIEditableTableBody: React.FunctionComponent<Props>;
export default XUIEditableTableBody;

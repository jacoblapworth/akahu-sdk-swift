import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  qaHook?: string;
}

type SpreadProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIEditableTableHead: React.FunctionComponent<Props>;
export default XUIEditableTableHead;

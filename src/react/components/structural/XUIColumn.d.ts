import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  gridColumns?: number | string;
  gridColumnsLargeUp?: number | string;
  gridColumnsSmallUp?: number | string;
  qaHook?: string;
}

type SpreadProps = React.HTMLAttributes<HTMLDivElement>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIColumn: React.FunctionComponent<Props>;
export default XUIColumn;

export const getAllClasses: (
  props: Pick<Props, 'className' | 'gridColumns' | 'gridColumnsLargeUp' | 'gridColumnsSmallUp'>,
) => string;

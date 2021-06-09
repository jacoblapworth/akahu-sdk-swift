import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Aligns the content of the cell on the inline (horizontal) axis.
   */
  inlineAlignment?: 'end' | 'start';
  qaHook?: string;
  /**
   * The `scope` attribute added to the <th> element to tell screenreaders exactly what cells the
   * header is a header for
   *
   * Default value is `col`
   */
  scope?: 'col' | 'colGroup' | 'row' | 'rowGroup';
}

type Props = BaseProps &
  React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;

declare const XUIEditableTableHeadingCell: React.FunctionComponent<Props>;
export default XUIEditableTableHeadingCell;

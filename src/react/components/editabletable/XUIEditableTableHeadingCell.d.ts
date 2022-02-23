import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Aligns the content of the cell on the inline (horizontal) axis.
   */
  inlineAlignment?: 'end' | 'start';
  /**
   * Indicates that the table is currently being sorted by this column.
   * No more than one `XUIEditableTableHeadingCell` should have this set to `true`.
   */
  isSortActive?: boolean;
  /**
   * Indicates whether the rows are arranged in ascending or descending order.
   * This indication only appears if the `isSortActive` is set to `true`.
   */
  isSortAsc?: boolean;
  /**
   * Callback to handle a sort interaction.
   * If this prop is provided, this component will have sort controls.
   */
  onSortChange?: (newKey: string) => void;
  qaHook?: string;
  /**
   * The `scope` attribute added to the <th> element to tell screenreaders exactly what cells the
   * header is a header for
   *
   * Default value is `col`
   */
  scope?: 'col' | 'colGroup' | 'row' | 'rowGroup';
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<
  React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >,
  keyof BaseProps
>;

type Props = BaseProps & SpreadProps;

declare const XUIEditableTableHeadingCell: React.FunctionComponent<Props>;
export default XUIEditableTableHeadingCell;

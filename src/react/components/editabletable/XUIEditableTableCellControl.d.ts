import * as React from 'react';

interface BaseProps {
  /**
   * Id of the control cell
   */
  cellIds?: {
    control?: string;
    wrapper?: string;
  };
  children?: React.ReactNode;
  className?: string;
  /**
   * Used to style the cell as disabled.
   */
  isDisabled?: boolean;
  /**
   * Used to style the cell as focused.
   */
  isFocused?: boolean;
  /**
   * Used to style the cell as invalid.
   */
  isInvalid?: boolean;
  /**
   * Validation message to show under the input if `isInvalid` is true.
   */
  validationMessage?: React.ReactNode;
}

type SpreadProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  HTMLTableDataCellElement
>;

type Props = BaseProps & Omit<SpreadProps, keyof BaseProps>;

declare const XUIEditableTableCellControl: React.FunctionComponent<Props>;
export default XUIEditableTableCellControl;

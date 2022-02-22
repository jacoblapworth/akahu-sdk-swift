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

declare const XUIEditableTableCellControl: React.FunctionComponent<Props>;
export default XUIEditableTableCellControl;

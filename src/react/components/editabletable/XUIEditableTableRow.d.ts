import * as React from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether to disable controls in the row, including drag and remove icons
   */
  disableRowControls?: boolean;
  /**
   * The index of the row in the list. This will typically be the `index`
   * provided by `Array.prototype.map`.
   *
   * ⚠️ *Required for draggable rows*
   */
  index?: number;
  onRemove?: () => void;
  qaHook?: string;
  style?: React.CSSProperties;
}

// If SpreadProps is a union the Omit must be applied to all types in the union individually.
// Using an Omit over an entire union will not work as expected.
// See XUIButton.d.ts for an example & XUI-3079 for an explanation.
type SpreadProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>,
  keyof BaseProps
>;

type Props = BaseProps & SpreadProps;

declare const XUIEditableTableRow: React.FunctionComponent<Props>;
export default XUIEditableTableRow;

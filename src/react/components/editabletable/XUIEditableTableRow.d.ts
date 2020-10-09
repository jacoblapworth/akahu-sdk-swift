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

type Props = BaseProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;

declare const XUIEditableTableRow: React.FunctionComponent<Props>;
export default XUIEditableTableRow;

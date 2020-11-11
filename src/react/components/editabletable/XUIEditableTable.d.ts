import * as React from 'react';

import { XUIEditableTableContextShape } from './contexts/XUIEditableTableContext';

interface BaseProps {
  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  /**
   * Array of columns widths to be applied in order. Can be explicit widths, percentages, "auto", or
   * empty strings to skip styling a column and fall back to default behaviour. If values are not
   * supplied, columns will default to equal widths, filling the available space.
   */
  columnWidths?: string[];
  /**
   * A function used to determine the message read by screen readers when the user cancels dragging.
   *
   * Recommended English return value:
   *
   * *Movement cancelled. The item has returned to its starting position of ${startPosition}.*
   */
  dndDragCancelledMessage?: (startPosition: number) => string;
  /**
   * A function used to determine the message read by screen readers when the user drags a row
   * outside of the table.
   *
   * Recommended English return value:
   *
   * *You are currently not dragging over a droppable area.*
   */
  dndDragOutsideMessage?: (startPosition: number) => string;
  /**
   * A function used to determine the message read by screen readers when the user starts dragging a
   * row.
   *
   * Recommended English return value:
   *
   * *You have lifted an item in position ${startPosition}.*
   */
  dndDragStartMessage?: (startPosition: number) => string;
  /**
   * A function used to determine the message read by screen readers when the user drags a row to a
   * new position.
   *
   * Recommended English return value:
   *
   * *You have moved the item from position ${startPosition} to position ${endPosition}.*
   */
  dndDragUpdateMessage?: (startPosition: number, endPosition: number) => string;
  /**
   * A function used to determine the message read by screen readers when the user drops a row
   * outside of the table.
   *
   * Recommended English return value:
   *
   * *The item has been dropped while not over a droppable area. The item has returned to its
   * position of ${startPosition}.*
   */
  dndDropFailedMessage?: (startPosition: number) => string;
  /**
   * A function used to determine the message read by screen readers when the user drops a row in a
   * new position.
   *
   * Recommended English return value:
   *
   * *You have dropped the item. It has moved from position ${startPosition} to ${endPosition}.*
   */
  dndDropMessage?: (startPosition: number, endPosition: number) => string;
  /**
   * The message to be read by screen readers when the user focuses on the drag handle.
   *
   * Recommended English value:
   *
   * *Press space bar to start a drag. When dragging you can use the arrow keys to move the item
   * around and escape to cancel. Ensure your screen reader is in focus mode or forms mode.*
   */
  dndInstructions?: string;
  /**
   * Pin the leftmost column when scrolling horizontally.
   */
  hasPinnedFirstColumn?: boolean;
  /**
   * Pin the rightmost column when horizontally scrolling.
   */
  hasPinnedLastColumn?: boolean;
  /**
   * Array of column _indexes_ to be hidden. Zero-based. Hidden elements remain in the DOM.
   * Convenient and performant for when the available columns and their order will not be changing.
   * For more dynamic tables, consider an alternate approach.
   */
  hiddenColumns?: Array<number | string>;
  /**
   * Optional id to be applied to the table. If one is not provided, a unique one will be generated.
   */
  id?: string;
  /**
   * Used to style the table as invalid.
   */
  isInvalid?: boolean;
  maxWidth?: string;
  minWidth?: string;
  /**
   * The `onReorderRow` callback must result in the synchronous reordering of rows in the source
   * data, such as through `setState()`.
   */
  onReorderRow?: (startIndex: number, destinationIndex: number) => void;
  qaHook?: string;
  rowOptions?: XUIEditableTableContextShape['rowOptions'];
  style?: React.CSSProperties;
  /**
   * Validation message to show under the table if `isInvalid` is true.
   */
  validationMessage?: React.ReactNode;
}

type Props = BaseProps &
  React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;

declare const XUIEditableTable: React.FunctionComponent<Props>;
export default XUIEditableTable;

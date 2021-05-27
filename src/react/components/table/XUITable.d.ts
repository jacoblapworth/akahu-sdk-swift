/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { XUIIconData } from '../icon/XUIIcon';
import XUIPickitem from '../picklist/XUIPickitem';

interface BaseProps {
  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  caption?: string;
  /**
   * The Column component(s) that will appear in the table layout.
   */
  children?: React.ReactNode;
  /**
   * Attached to the outer most element of the table layout.
   */
  className?: string;
  /**
   * The row data for the table body. Each row is differentiated by a unique object key. Pass the
   * key `rowClassName` in a row object to apply a custom class.
   */
  data: TableObject;
  /**
   * Whether the table should omit the `xui-panel` class to render without a border.
   */
  isBorderless?: boolean;
  /**
   * Appends a `XUILoader` after the last row.
   */
  isLoading?: boolean;
  /**
   * Allows the table to scroll horizontally when there is overflowing columns.
   */
  isResponsive?: boolean;
  /**
   * Changes overflowing column data into a truncated column view if legibility can still be
   * maintained.
   */
  isTruncated?: boolean;
  /**
   * Accessibility label for the `XUILoader`. This is required if the `isLoading` prop is set to
   * `true`.
   *
   * Recommended English value: *Loading more data*
   */
  loaderAriaLabel?: string;
  qaHook?: string;
}

interface AppendageProps {
  /**
   * Appends custom JSX above the table in a footer position.
   */
  footer?: React.ReactNode;
  /**
   * Prepends custom JSX above the table in a header position.
   */
  header?: React.ReactNode;
}

interface CheckboxProps {
  /**
   * Describes the "all rows" checkbox functionality for accessibility. Required when `showHeader`
   * and `hasCheckbox` are set to `true`.
   *
   * Recommended English value: *Select all rows*
   */
  checkAllRowsAriaLabel?: React.ReactNode;
  /**
   * Describes "single row" checkbox functionality for accessibility. Required when `hasCheckbox` is
   * set to `true`.
   *
   * Recommended English value: *Select row*
   */
  checkOneRowAriaLabel?: React.ReactNode;
  /**
   * Defines the unique row keys that are currently in a checked state.
   */
  checkedIds?: {
    [key: string]: boolean;
  };
  /**
   * Defines the unique row keys that are currently in a disabled state.
   */
  disabledIds?: {
    [key: string]: boolean;
  };
  /**
   * Prepends a custom checkbox column to the table.
   */
  hasCheckbox?: boolean;
  /**
   * Callback for when the mast "toggle all" checkbox is clicked.
   */
  onCheckAllToggle?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback to handle a single checkbox interaction inside of a row.
   */
  onCheckOneToggle?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => any;
}

interface EmptyStateProps {
  /**
   * Change the default "Empty State" message with a custom version.
   *
   * Recommended English value: *Nothing to show here*
   */
  emptyMessage?: React.ReactNode;
  /**
   * Inject a custom "Empty State" design to override the default version.
   */
  emptyStateComponent?: React.ReactNode;
  /**
   * Optional prop for users to modify the empty state icon, if required for localisation.
   * Defaults to the table icon, if no value is provided.
   */
  emptyStateIcon?: XUIIconData;
}

interface InteractionProps {
  /**
   * A callback function for row interactions.
   */
  onRowClick?: InteractionHandler;
  /**
   * A function that receives a single rows data set and determines if that particular row should
   * have the `onRowClick` click handler applied to it.
   */
  shouldRowClick?: (rowData: EnrichedTableItemObject) => boolean;
}

interface OverflowProps {
  /**
   * A function that is supplied the data from each row and returns an array of Pickitem components.
   */
  createOverflowMenu?: (
    rowData: EnrichedTableItemObject,
  ) => Array<React.ReactElement<React.ComponentProps<typeof XUIPickitem>>>;
  /**
   * Appends a custom overflow menu column to the table.
   */
  hasOverflowMenu?: boolean;
  /**
   * Describes overflow menu functionality for accessibility. Required when `hasOverflowMenu` is set
   * to `true`.
   *
   * Recommended English value: *More row options*
   */
  overflowMenuTitle?: string;
}

interface PinningProps {
  /**
   * If the first column is an action (Checkbox) visibly pin it to the left when scrolling.
   */
  hasPinnedFirstColumn?: boolean;
  /**
   * If the last column is an action (Overflow Menu) visibly pin it to the right when scrolling.
   */
  hasPinnedLastColumn?: boolean;
}

interface SortingProps {
  /**
   * Turns the head column with the corresponding sort key into an active sorting state.
   */
  activeSortKey?: string;
  /**
   * A function that replaces the default sort system.
   */
  customSort?: (
    flattenedData: EnrichedTableItemObject[],
    isSortAsc?: boolean,
    activeSortKey?: string,
  ) => EnrichedTableItemObject[];
  /**
   * Determines if the rows are arranged in an ascending or descending order.
   */
  isSortAsc?: boolean;
  /**
   * Callback to handle a sort interaction.
   */
  onSortChange?: (sortkey: string) => any;
}

interface TableObject {
  [key: string]: TableItemObject;
}

type TableItemObject = any;

type InteractionHandler = (
  event: React.MouseEvent | React.KeyboardEvent,
  data: EnrichedTableItemObject,
) => any;

export type CreateInteractionHandler = (
  rowData: EnrichedTableItemObject,
) => undefined | null | false | void | InteractionHandler;

export type EnrichedTableItemObject = TableItemObject & { _id: string };

type Props = BaseProps &
  AppendageProps &
  CheckboxProps &
  EmptyStateProps &
  InteractionProps &
  OverflowProps &
  PinningProps &
  SortingProps;

export default class XUITable extends React.Component<Props> {
  /**
   * Root node to enable users to access as a ref.
   */
  rootNode: HTMLElement | null;
}

import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTable from '../../editabletable';
import { XUITableColumn } from '../../table';
import { observe, unobserve } from '../helpers/resizeObserver';
import { XUIIconData } from '../icon/XUIIcon';
import XUILoader from '../loader/XUILoader';
import basicSort from './helpers/basicSort';
import canTruncate from './helpers/canTruncate';
import { tableName } from './helpers/constants';
import XUITableBody from './private/XUITableBody';
import XUITableHead from './private/XUITableHead';

export interface RowData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [columnName: string]: any;
  rowClassName?: string;
}

interface BaseProps<RD extends RowData> {
  /**
   * Turns the head column with the corresponding sort key into an active sorting state.
   */
  activeSortKey?: string;
  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element. This prop also
   * satisifies the 'ariaLabel' requirement for XUIEditableTable.
   */
  caption: string;
  /**
   * Describes the "all rows" checkbox functionality for accessibility. Required when `showHeader`
   * and `hasCheckbox` are set to true.
   *
   *
   * Recommended English value: *Select all rows*
   */
  checkAllRowsAriaLabel?: React.ReactNode;
  /**
   * Describes "single row" checkbox functionality for accessibility. Required when `hasCheckbox` is
   * set to `true`.
   *
   *
   * Recommended English value: *Select row*
   */
  checkOneRowAriaLabel?: React.ReactNode;
  /**
   * Defines the unique row keys that are currently in a checked state.
   */
  checkedIds?: { [rowId: string]: boolean };
  /**
   * The Column component(s) that will appear in the table layout.
   */
  children?: React.ReactNode;
  /**
   * Attached to the outer most element of the table layout.
   */
  className?: string;
  /**
   * Array of columns widths to be applied in order. Can be explicit widths, percentages, "auto", or
   * empty strings to skip styling a column and fall back to default behaviour. If values are not
   * supplied, columns will default to equal widths, filling the available space.
   */
  columnWidths?: string[];
  /**
   * A function that is supplied the data from each row and returns a collection of pickitems.
   */
  createOverflowMenu?: (rowData: RD) => React.ReactNode;
  /**
   * A function that replaces the default sort system.
   */
  customSort?: <Items extends Array<RD>>(
    items: Items,
    isAscending: boolean | undefined,
    activeSortKey: string,
  ) => Items;
  /**
   * The row data for the table body. Each row is differentiated by a unique object key. Pass the
   * key `rowClassName` in a row object to apply a custom class.
   */
  data: {
    [rowId: string]: RD;
  };
  /**
   * Defines the unique row keys that are currently in a disabled state.
   */
  disabledIds?: { [rowId: string]: boolean };
  /**
   * The message to show if the chart is empty.
   *
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
  /**
   * Appends custom JSX above the table in a footer position.
   */
  footer?: React.ReactNode;
  /**
   * Prepends a custom checkbox column to the table.
   */
  hasCheckbox?: boolean;
  /**
   * Appends a custom overflow menu column to the table.
   */
  hasOverflowMenu?: boolean;
  /**
   * If the first column is an action (Checkbox) visibly pin it to the left when scrolling.
   */
  hasPinnedFirstColumn?: boolean;
  /**
   * If the last column is an action (Overflow Menu) visibly pin it to the right when scrolling.
   */
  hasPinnedLastColumn?: boolean;
  /**
   * Prepends custom JSX above the table in a header position.
   */
  header?: React.ReactNode;
  /**
   * Array of column _indexes_ to be hidden. Zero-based. Hidden elements remain in the DOM.
   * Convenient and performant for when the available columns and their order will not be changing.
   * For more dynamic tables, consider an alternate approach.
   */
  hiddenColumns?: Array<number | string>;
  /**
   * Whether the table should omit the xui-panel class to render without a border.
   */
  isBorderless?: boolean;
  /**
   * Appends a XUILoader after the last row.
   */
  isLoading?: boolean;
  /**
   * Allows the table to scroll horizontally when there is overflowing columns.
   */
  isResponsive?: boolean;
  /**
   * Determines if the rows are arranged in an ascending or descending order.
   */
  isSortAsc?: boolean;
  /**
   * Changes overflowing column data into a truncated column view if legibility can still be
   * maintained.
   */
  isTruncated?: boolean;
  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   *
   *
   * Recommended English value: *Loading more data*
   */
  loaderAriaLabel?: string;
  maxWidth?: string;
  minWidth?: string;
  /**
   * Callback for when the mast "toggle all" checkbox is clicked.
   */
  onCheckAllToggle?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Callback to handle a single checkbox interaction inside of a row.
   */
  onCheckOneToggle?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  /**
   * A callback function for row interactions.
   */
  onRowClick?: (
    event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    rowData: RD,
  ) => void;
  /**
   * Callback to handle a sort interaction.
   */
  onSortChange?: (newKey: string) => void;
  /**
   * Describes overflow menu functionality for accessibility. Required when `hasOverflowMenu` is set
   * to true.
   *
   *
   * Recommended English value: *More row options*
   */
  overflowMenuTitle?: string;
  qaHook?: string;
  /**
   * A function that receives a single rows data set and determines if that particular row should
   * have the `onRowClick` click handler applied to it.
   */
  shouldRowClick?: (rowData: RD) => boolean;
  /**
   * Sets the table's layout to `fixed`.
   */
  useFixedLayout?: boolean;
}

type Props<RD extends RowData> = BaseProps<RD>;

interface State {
  rootWidth?: number;
}

class XUITable<RD extends RowData = RowData> extends React.PureComponent<Props<RD>, State> {
  public rootNode = React.createRef<HTMLDivElement>();

  public _area = this.rootNode;

  public tableNode = React.createRef<HTMLTableElement>();

  public wrapperNode = React.createRef<HTMLDivElement>();

  state: State = {};

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  render() {
    const {
      activeSortKey,
      caption,
      checkAllRowsAriaLabel,
      checkedIds = {},
      checkOneRowAriaLabel,
      children,
      className,
      columnWidths,
      maxWidth,
      minWidth,
      createOverflowMenu,
      customSort,
      data: rows,
      disabledIds = {},
      emptyMessage,
      emptyStateComponent,
      emptyStateIcon,
      footer,
      hasCheckbox,
      hasOverflowMenu,
      hasPinnedFirstColumn,
      hasPinnedLastColumn,
      header,
      hiddenColumns,
      isBorderless,
      isLoading,
      isResponsive,
      isSortAsc,
      isTruncated: shouldTruncate,
      loaderAriaLabel,
      onCheckAllToggle,
      onCheckOneToggle,
      onRowClick,
      onSortChange,
      overflowMenuTitle,
      qaHook,
      shouldRowClick,
      useFixedLayout,
    } = this.props;

    const checkedRowIds = Object.keys(checkedIds).filter(key => checkedIds[key]);
    const columns = React.Children.toArray(children) as Array<XUITableColumn<RD>>;
    const disabledRowIds = Object.keys(disabledIds).filter(key => disabledIds[key]);

    const everyColumnHasHeader =
      Boolean(columns.length) &&
      columns.every(element => React.isValidElement(element) && element.props.head);

    const isTruncated = canTruncate(this.state, this.props) && shouldTruncate;

    const wrapperStyle =
      // If we omit this check, wrapperStyle is always a non-empty object, and passes extraneous (but harmless) props.
      // This is for tidiness purposes only.
      maxWidth || minWidth
        ? {
            maxWidth,
            minWidth,
          }
        : undefined;

    return (
      <div
        className={cn(
          className,
          !isBorderless && `${tableName}-hasborder`,
          !isResponsive && `${tableName}-noscroll`,
          !(typeof window !== 'undefined' && window.PointerEvent) && `${tableName}-nopointerevents`,
        )}
        data-automationid={qaHook}
        ref={this.rootNode}
        style={wrapperStyle}
      >
        {header && (
          <div
            className={`${tableName}--customheader`}
            data-automationid={qaHook && `${qaHook}-header`}
          >
            {header}
          </div>
        )}
        <XUIEditableTable
          _variant="readonly"
          ariaLabel={caption}
          columnWidths={columnWidths}
          hasPinnedFirstColumn={hasPinnedFirstColumn}
          hasPinnedLastColumn={hasPinnedLastColumn}
          hiddenColumns={hiddenColumns}
          qaHook={qaHook && `${qaHook}-table`}
          ref={this.tableNode}
          scrollContainerRef={this.wrapperNode}
          tableClassName={cn(
            isTruncated && `${tableName}-is-truncated`,
            useFixedLayout && `${tableName}-fixed-layout`,
          )}
        >
          {everyColumnHasHeader && (
            <XUITableHead
              activeSortKey={activeSortKey}
              checkAllRowsAriaLabel={checkAllRowsAriaLabel}
              columns={React.Children.toArray(children) as Array<XUITableColumn<RD>>}
              hasCheckbox={hasCheckbox}
              hasOverflowMenu={hasOverflowMenu}
              isSelectAllChecked={
                Object.keys(rows).length > 0 && checkedRowIds.length === Object.keys(rows).length
              }
              isSelectAllDisabled={Object.keys(rows).length === 0}
              isSelectAllIndeterminate={
                checkedRowIds.length > 0 && checkedRowIds.length < Object.keys(rows).length
              }
              isSortAsc={isSortAsc}
              isTruncated={isTruncated}
              onCheckAllToggle={onCheckAllToggle}
              onSortChange={onSortChange}
              qaHook={qaHook && `${qaHook}-head`}
            />
          )}
          <XUITableBody
            activeSortKey={activeSortKey}
            checkOneRowAriaLabel={checkOneRowAriaLabel}
            checkedRowIds={checkedRowIds}
            columns={columns}
            createOverflowMenu={createOverflowMenu}
            disabledRowIds={disabledRowIds}
            emptyMessage={emptyMessage}
            emptyStateComponent={emptyStateComponent}
            emptyStateIcon={emptyStateIcon}
            hasCheckbox={hasCheckbox}
            hasOverflowMenu={hasOverflowMenu}
            isLoading={isLoading}
            isSortAsc={isSortAsc}
            isTruncated={isTruncated}
            loaderAriaLabel={loaderAriaLabel}
            onCheckOneToggle={onCheckOneToggle}
            onRowClick={onRowClick}
            overflowMenuTitle={overflowMenuTitle}
            qaHook={qaHook}
            rows={rows}
            shouldRowClick={shouldRowClick}
            sortRows={customSort || basicSort}
          />
        </XUIEditableTable>
        {isLoading && (
          <div
            className={cn(`${tableName}--loader`, `${tableName}--alert`)}
            data-automationid={qaHook && `${qaHook}-loader`}
          >
            <XUILoader ariaLabel={loaderAriaLabel || ''} />
          </div>
        )}
        {footer && (
          <div
            className={`${tableName}--customfooter`}
            data-automationid={qaHook && `${qaHook}-footer`}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }

  public _onResize = (contentRect: Partial<DOMRectReadOnly>) => {
    this.setState({ rootWidth: contentRect.width });
  };

  static propTypes = {
    activeSortKey: PropTypes.string,
    caption: PropTypes.string.isRequired,
    checkAllRowsAriaLabel: PropTypes.node,
    checkedIds: PropTypes.object,
    checkOneRowAriaLabel: PropTypes.node,
    children: PropTypes.node,
    className: PropTypes.string,
    columnWidths: PropTypes.arrayOf(PropTypes.string),
    createOverflowMenu: PropTypes.func,
    customSort: PropTypes.func,
    data: PropTypes.object.isRequired,
    disabledIds: PropTypes.object,
    emptyMessage: PropTypes.node,
    emptyStateComponent: PropTypes.node,
    emptyStateIcon: PropTypes.shape({
      height: PropTypes.number,
      path: PropTypes.string,
      width: PropTypes.number,
    }),
    footer: PropTypes.node,
    hasCheckbox: PropTypes.bool,
    hasOverflowMenu: PropTypes.bool,
    hasPinnedFirstColumn: PropTypes.bool,
    hasPinnedLastColumn: PropTypes.bool,
    header: PropTypes.node,
    hiddenColumns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    isBorderless: PropTypes.bool,
    isLoading: PropTypes.bool,
    isResponsive: PropTypes.bool,
    isSortAsc: PropTypes.bool,
    isTruncated: PropTypes.bool,
    loaderAriaLabel: PropTypes.string,
    maxWidth: PropTypes.string,
    minWidth: PropTypes.string,
    onCheckAllToggle: PropTypes.func,
    onCheckOneToggle: PropTypes.func,
    onRowClick: PropTypes.func,
    onSortChange: PropTypes.func,
    overflowMenuTitle: PropTypes.string,
    qaHook: PropTypes.string,
    shouldRowClick: PropTypes.func,
    useFixedLayout: PropTypes.bool,
  };
}

export default XUITable;

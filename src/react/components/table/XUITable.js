import 'core-js/features/array/fill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import uuid from 'uuid/v4';
import XUILoader from '../loader/XUILoader';
import noop from '../helpers/noop';
import { enrichProps } from './helpers/utilities';
import { NAME_SPACE, ACTION_WIDTH } from './helpers/constants';
import TableHead from './customElements/TableHead';
import TableBodyRow from './customElements/TableBodyRow';
import EmptyState from './customElements/EmptyState';
import TableAlert from './customElements/TableAlert';
import { ns } from '../helpers/xuiClassNamespace';

class XUITable extends Component {
  state = { rootWidth: null };

  rootNode;

  wrapperNode;

  tableNode;

  instanceId = uuid();

  componentDidUpdate = () => {
    this.setCurrentWidth();
    this.setScrollOverflow();
  };

  componentDidMount = () => {
    this.resizeThrottled = throttle(this.setCurrentWidth, 500);
    this.scrollThrottled = throttle(this.setScrollOverflow, 100);
    this.setCurrentWidth();
    window.addEventListener('resize', this.resizeThrottled);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeThrottled);
    this.resizeThrottled.cancel();
  };

  setCurrentWidth = () => {
    const { rootNode } = this;
    const { rootWidth: stateRootWidth } = this.state;
    const rootWidth = rootNode && rootNode.clientWidth;
    const isRootWidthNew = rootNode && rootWidth !== stateRootWidth;

    if (isRootWidthNew) {
      this.setState({ rootWidth });
    }
  };

  setScrollOverflow = () => {
    const { rootNode, wrapperNode, tableNode } = this;
    const scrollLeft = wrapperNode && wrapperNode.scrollLeft;
    const wrapperWidth = wrapperNode && wrapperNode.clientWidth;
    const tableWidth = tableNode && tableNode.clientWidth;
    const leftAction = scrollLeft > 0;
    const rightAction = scrollLeft + wrapperWidth < tableWidth - 1; // `scrollLeft + wrapper width` is 1px less than `tableWidth` in Firefox when fully scrolled to the right

    if (leftAction) {
      rootNode.classList.add(`${NAME_SPACE}-overflowleft`);
    } else {
      rootNode.classList.remove(`${NAME_SPACE}-overflowleft`);
    }

    if (rightAction) {
      rootNode.classList.add(`${NAME_SPACE}-overflowright`);
    } else {
      rootNode.classList.remove(`${NAME_SPACE}-overflowright`);
    }
  };

  ensureCellVisibility = event => {
    const { wrapperNode, props } = this;
    const { hasPinnedFirstColumn, hasPinnedLastColumn } = props;

    // When "pinned" colums are not active the browser can handle showing cells
    // natively so we bail to save CPU and extra edge cases.
    if (!(hasPinnedFirstColumn || hasPinnedLastColumn)) {
      return;
    }

    // Generic measurements around where we are in the Table in respect to
    // width / scroll etc.
    const { clientWidth: cellWidth, offsetLeft: cellOffset } = event.currentTarget;
    const scrollOffset = wrapperNode.scrollLeft;
    const wrapperWidth = wrapperNode.clientWidth;

    // Where does the "left" and "right" of the Cell reside in respect to the
    // visible viewing area.
    const relativeLeftOffset = cellOffset - scrollOffset;
    const relativeRightOffset = relativeLeftOffset + cellWidth;

    let hasCellReset = false;

    if (!hasCellReset && hasPinnedLastColumn) {
      // Cell to the left so that the right side becomes visible from under the
      // pinned last column.
      const overlap = relativeRightOffset - (wrapperWidth - ACTION_WIDTH);
      const hasRightOverlap = relativeRightOffset > wrapperWidth - ACTION_WIDTH;

      wrapperNode.scrollLeft = hasRightOverlap ? scrollOffset + overlap : scrollOffset;
      hasCellReset = hasRightOverlap;
    }

    if (!hasCellReset && hasPinnedFirstColumn) {
      // Move Cell to the right so that the left side becomes visible from under
      // the pinned first column.
      const overlap = ACTION_WIDTH - relativeLeftOffset;
      const hasLeftOverlap = hasPinnedFirstColumn && relativeLeftOffset < ACTION_WIDTH;

      wrapperNode.scrollLeft = hasLeftOverlap ? scrollOffset - overlap : scrollOffset;
      hasCellReset = hasLeftOverlap;
    }

    if (hasCellReset) {
      // We are fudging with the scroll and therefore the overflow shadows may not
      // be representative of the current scroll values (lets take a look to make sure).
      this.setScrollOverflow();
    }
  };

  render = () => {
    const { state, props, rootNode, tableNode, wrapperNode, ensureCellVisibility } = this;
    const {
      qaHook,
      caption,
      className: suppliedClasses,
      hasHeader,
      isResponsive,
      isTruncated,
      isBorderless,
      isLoading,
      loaderLabel,
      isEmpty,
      emptyStateComponent,
      emptyStateIcon,
      emptyMessage,
      activeSortKey,
      isSortAsc,
      onSortChange,
      hasCheckbox,
      checkedIds,
      disabledIds,
      onCheckAllToggle,
      onCheckOneToggle,
      checkOneRowLabel,
      checkAllRowsLabel,
      hasOverflowMenu,
      createOverflowMenu,
      overflowMenuTitle,
      hasPinnedFirstColumn,
      hasPinnedLastColumn,
      createDividerClasses,
      onRowClick,
      shouldRowClick,
      header,
      footer,
      columns,
      data,
      hasPointerEvents,
      headerSortbuttonIcon,
    } = enrichProps(state, props, { rootNode, tableNode, wrapperNode });

    const className = cn(NAME_SPACE, suppliedClasses, {
      [`${ns}-panel`]: !isBorderless,
      [`${NAME_SPACE}-responsive`]: isResponsive,
      [`${NAME_SPACE}-withtruncation`]: isTruncated,
      [`${NAME_SPACE}-pinleft`]: hasPinnedFirstColumn,
      [`${NAME_SPACE}-pinright`]: hasPinnedLastColumn,
      [`${NAME_SPACE}-hasheader`]: hasHeader,
      [`${NAME_SPACE}-nopointerevents`]: !hasPointerEvents,
    });
    const checkboxState = (_id, checkboxStateIds) => checkboxStateIds.indexOf(_id) >= 0;
    const handleScroll = hasPinnedFirstColumn || hasPinnedLastColumn ? this.scrollThrottled : noop;

    return (
      <div className={className} data-automationid={qaHook} ref={node => (this.rootNode = node)}>
        {header && (
          <div
            className={`${NAME_SPACE}--customheader`}
            data-automationid={qaHook && `${qaHook}-header`}
          >
            {header}
          </div>
        )}

        <div
          aria-labelledby={caption && `${this.instanceId}-caption`}
          className={`${NAME_SPACE}-wrapper`}
          onScroll={handleScroll}
          ref={node => (this.wrapperNode = node)}
          role={isResponsive && 'group'}
          tabIndex={isResponsive ? 0 : undefined}
        >
          <table
            className={`${NAME_SPACE}-element`}
            data-automationid={qaHook && `${qaHook}-table`}
            ref={node => (this.tableNode = node)}
          >
            {caption && (
              <caption className={`${NAME_SPACE}--caption`} id={`${this.instanceId}-caption`}>
                {caption}
              </caption>
            )}
            {hasHeader && (
              <TableHead
                {...{
                  data,
                  columns,
                  activeSortKey,
                  isSortAsc,
                  onSortChange,
                  hasCheckbox,
                  checkedIds,
                  disabledIds,
                  onCheckAllToggle,
                  checkAllRowsLabel,
                  hasOverflowMenu,
                  ensureCellVisibility,
                  headerSortbuttonIcon,
                }}
              />
            )}

            <tbody className={`${NAME_SPACE}--body`}>
              {data &&
                data.map((rowData, rowIndex) => (
                  <TableBodyRow
                    {...{
                      key: `row-${rowData._id}`,
                      rowData,
                      rowIndex,
                      columns,
                      hasCheckbox,
                      isChecked: checkboxState(rowData._id, checkedIds),
                      isDisabled: checkboxState(rowData._id, disabledIds),
                      onCheckOneToggle,
                      checkOneRowLabel,
                      onRowClick,
                      shouldRowClick,
                      hasOverflowMenu,
                      createOverflowMenu,
                      overflowMenuTitle,
                      createDividerClasses,
                      ensureCellVisibility,
                    }}
                  />
                ))}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <TableAlert qaHook={qaHook && `${qaHook}-loader`}>
            <XUILoader ariaLabel={loaderLabel} />
          </TableAlert>
        )}

        {isEmpty && (
          <TableAlert qaHook={qaHook && `${qaHook}-empty`}>
            {emptyStateComponent || <EmptyState icon={emptyStateIcon}>{emptyMessage}</EmptyState>}
          </TableAlert>
        )}

        {footer && (
          <div
            className={`${NAME_SPACE}--customfooter`}
            data-automationid={qaHook && `${qaHook}-footer`}
          >
            {footer}
          </div>
        )}
      </div>
    );
  };
}

XUITable.propTypes = {
  /** The row data for the table body. Each row is differentiated by a unique object key.
   * Pass the key `rowClassName` in a row object to apply a custom class.
   */
  data: PropTypes.object.isRequired,

  /** The Column component(s) that will appear in the table layout. */
  children: PropTypes.node.isRequired,

  qaHook: PropTypes.string,

  /** Attached to the outer most element of the table layout. */
  className: PropTypes.string,

  /** Allows the table to scroll horizontally when there is overflowing columns. */
  isResponsive: PropTypes.bool,

  /** Changes overflowing column data into a truncated column view if legibility can
   * still be maintained. */
  isTruncated: PropTypes.bool,

  /** Whether the table should omit the xui-panel class to render without a border */
  isBorderless: PropTypes.bool,

  // - - - - //
  // Loader. //
  // - - - - //

  /** Appends a XUILoader after the last row. */
  isLoading: PropTypes.bool,

  /**
   * Accessibility label for the `<XUILoader>`. This is required if the
   * `isLoading` prop is set to `true`.
   * <br />
   * Recommended English value: *Loading more data*
   */
  loaderLabel: PropTypes.string,

  // - - - - - //
  // Pinning.  //
  // - - - - - //

  /** If the first column is an action (Checkbox) visibly pin it to the left when scrolling. */
  hasPinnedFirstColumn: PropTypes.bool,

  /** If the last column is an action (Overflow Menu) visibly pin it to the right when scrolling. */
  hasPinnedLastColumn: PropTypes.bool,

  // - - - - - //
  // Checkbox. //
  // - - - - - //

  /** Prepends a custom checkbox column to the table. */
  hasCheckbox: PropTypes.bool,

  /** Defines the unique row keys that are currently in a checked state. */
  checkedIds: PropTypes.object,

  /** Defines the unique row keys that are currently in a disabled state. */
  disabledIds: PropTypes.object,

  /** Callback for when the mast "toggle all" checkbox is clicked. */
  onCheckAllToggle: PropTypes.func,

  /** Callback to handle a single checkbox interaction inside of a row. */
  onCheckOneToggle: PropTypes.func,

  /**
   * Describes "single row" checkbox functionality for accessibility.
   * Required when `hasCheckbox` is set to true.
   * <br />
   * Recommended English value: *Select row*
   */
  checkOneRowLabel: PropTypes.node,

  /**
   * Describes the "all rows" checkbox functionality for accessibility.
   * Required when `showHeader` and `hasCheckbox` are set to true.
   * <br />
   * Recommended English value: *Select all rows*
   */
  checkAllRowsLabel: PropTypes.node,

  // - - - - - - - //
  // Overflow Menu. //
  // - - - - - - - //

  /** Appends a custom overflow menu column to the table. */
  hasOverflowMenu: PropTypes.bool,

  /** A function that is supplied the data from each row and returns an array of
   * Pickitem components. */
  createOverflowMenu: PropTypes.func,

  /**
   * Describes overflow menu functionality for accessibility.
   * Required when `hasOverflowMenu` is set to true.
   * <br />
   * Recommended English value: *More row options*
   */
  overflowMenuTitle: PropTypes.string,

  // - - - - //
  // Sorting //
  // - - - - //

  /** Turns the head column with the corresponding sort key into an active sorting state. */
  activeSortKey: PropTypes.string,

  /** Determines if the rows are arranged in an ascending or descending order. */
  isSortAsc: PropTypes.bool,

  /** Callback to handle a sort interaction. */
  onSortChange: PropTypes.func,

  /** A function that replaces the default sort system. */
  customSort: PropTypes.func,

  // - - - - - - - //
  // Interaction.  //
  // - - - - - - - //

  /** A callback function for row interactions. */
  onRowClick: PropTypes.func,

  /** A function that receives a single rows data set and determines if that particular
   * row should have the `onRowClick` click handler applied to it. */
  shouldRowClick: PropTypes.func,

  // - - - - - - //
  // Appendages. //
  // - - - - - - //

  /** Prepends custom JSX above the table in a header position. */
  header: PropTypes.node,

  /** Appends custom JSX above the table in a footer position. */
  footer: PropTypes.node,

  // - - - - //
  // Empty.  //
  // - - - - //

  /** Inject a custom "Empty State" design to override the default version. */
  emptyStateComponent: PropTypes.node,

  /**
   * The message to show if the chart is empty.
   * <br />
   * Recommended English value: *Nothing to show here*
   */
  emptyMessage: PropTypes.node,

  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  caption: PropTypes.string,

  /**
   * Optional prop for users to modify the empty state icon, if required for localisation.
   * Defaults to the table icon, if no value is provided.
   */
  emptyStateIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /**
   * Optional prop for users to modify the header sort button icon, if required for localisation.
   * Defaults to the sortSingle icon, if no value is provided.
   */
  headerSortbuttonIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

XUITable.defaultProps = {
  checkedIds: {},
  disabledIds: {},
};

export default XUITable;

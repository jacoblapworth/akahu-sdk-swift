import 'core-js/library/fn/array/virtual/fill';
import 'element-closest';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
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
		const rootWidth = rootNode && rootNode.clientWidth;
		const isRootWidthNew = rootNode && rootWidth !== this.state.rootWidth;

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
		const rightAction = (scrollLeft + wrapperWidth) < tableWidth;

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
		if (!(hasPinnedFirstColumn || hasPinnedLastColumn)) { return; }

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
		const {
			state, props, rootNode, tableNode, wrapperNode, ensureCellVisibility,
		} = this;
		const {
			qaHook,
			className: suppliedClasses,
			hasHeader,
			isResponsive,
			isTruncated,
			isBorderless,
			isLoading,
			loaderLabel,
			isEmpty,
			emptyStateComponent,
			emptyMessage,
			activeSortKey,
			isSortAsc,
			onSortChange,
			hasCheckbox,
			checkedIds,
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
		} = enrichProps(state, props, { rootNode, tableNode, wrapperNode });

		const className = cn(
			NAME_SPACE,
			`${ns}-panel`,
			suppliedClasses,
			{
				[`${ns}-panel`]: !isBorderless,
				[`${NAME_SPACE}-responsive`]: isResponsive,
				[`${NAME_SPACE}-withtruncation`]: isTruncated,
				[`${NAME_SPACE}-pinleft`]: hasPinnedFirstColumn,
				[`${NAME_SPACE}-pinright`]: hasPinnedLastColumn,
				[`${NAME_SPACE}-hasheader`]: hasHeader,
				[`${NAME_SPACE}-nopointerevents`]: !hasPointerEvents,
			},
		);
		const checkIsChecked = _id => checkedIds.indexOf(_id) >= 0;
		const handleScroll = (hasPinnedFirstColumn || hasPinnedLastColumn) ? this.scrollThrottled : noop;

		return (
			<div
				className={className}
				ref={node => this.rootNode = node}
				data-automationid={qaHook}
			>

				{header && (
					<div
						data-automationid={qaHook && `${qaHook}-header`}
						className={`${NAME_SPACE}--customheader`}
					>
						{header}
					</div>
				)}

				<div
					className={`${NAME_SPACE}-wrapper`}
					ref={node => this.wrapperNode = node}
					onScroll={handleScroll}
				>

					<table
						data-automationid={qaHook && `${qaHook}-table`}
						className={`${NAME_SPACE}-element`}
						ref={node => this.tableNode = node}
					>

						{hasHeader && (

							<TableHead {...{
								data,
								columns,
								activeSortKey,
								isSortAsc,
								onSortChange,
								hasCheckbox,
								checkedIds,
								onCheckAllToggle,
								checkAllRowsLabel,
								hasOverflowMenu,
								ensureCellVisibility,
							}}
							/>

						)}

						<tbody className={`${NAME_SPACE}--body`}>

							{data && data.map((rowData, rowIndex) => (
								<TableBodyRow {...{
									key: `row-${rowData._id}`,
									rowData,
									rowIndex,
									columns,
									hasCheckbox,
									isChecked: checkIsChecked(rowData._id),
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
						{emptyStateComponent || <EmptyState>{emptyMessage}</EmptyState>}
					</TableAlert>
				)}

				{footer && (
					<div
						data-automationid={qaHook && `${qaHook}-footer`}
						className={`${NAME_SPACE}--customfooter`}
					>
						{footer}
					</div>
				)}

			</div>
		);
	}
}

XUITable.propTypes = {

	/** The row data for the table body. Each row is differentiated by a unique object key. */
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

	/** Adds a label attribute to the XUILoader for accessibility purposes. */
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

	/** Callback for when the mast "toggle all" checkbox is clicked. */
	onCheckAllToggle: PropTypes.func,

	/** Callback to handle a single checkbox interaction inside of a row. */
	onCheckOneToggle: PropTypes.func,

	/** Describes the "single row" checkbox functionality for accessibility purposes. */
	checkOneRowLabel: PropTypes.node,

	/** Describes the "all rows" checkbox functionality for accessibility purposes. */
	checkAllRowsLabel: PropTypes.node,

	// - - - - - - - //
	// Overflow Menu. //
	// - - - - - - - //

	/** Appends a custom overflow menu column to the table. */
	hasOverflowMenu: PropTypes.bool,

	/** A function that is supplied the data from each row and returns an array of
	 * Pickitem components. */
	createOverflowMenu: PropTypes.func,

	/** Describes the overflow menu functionality for accessibility purposes. */
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

	/** Change the default "Empty State" message with a custom version. */
	emptyMessage: PropTypes.node,

};

XUITable.defaultProps = {
	checkedIds: {},
	loaderLabel: 'Loading more data',
	emptyMessage: 'Nothing to show here',
	checkOneRowLabel: 'Select row',
	checkAllRowsLabel: 'Select all rows',
	overflowMenuTitle: 'More row options',
};

export default XUITable;

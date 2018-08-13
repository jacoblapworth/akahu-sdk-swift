import { NAME_SPACE } from './constants';
import cn from 'classnames'

const cellClassNames = {
	first: `${NAME_SPACE}--cell-first`,
	second: `${NAME_SPACE}--cell-second`,
	secondtolast: `${NAME_SPACE}--cell-secondtolast`,
	last: `${NAME_SPACE}--cell-last`,
};

export const createRowClickCallback = ({shouldRowClick, rowData, onRowClick}) => {
	switch (true) {
		// Checks the click handlers relevance (`shouldRowClick`) against this
		// particular rows data and then returns the handler (`onRowClick`) if required.
		case Boolean(shouldRowClick): return shouldRowClick(rowData) && onRowClick;

		// The legacy system that takes the `onRowClick` as a thunk
		// (`(args) => isRelevant() && () => ...`) and does the relevance test as well
		// as the click handling all in same prop. This was hard for our users to
		// grasp so we use the method above as the primary conditional / handler
		// combination.
		case Boolean(onRowClick): return onRowClick(rowData);

		// Do not create an interaction for the current row.
		default: return null;
	}
};

export const getCellLocation = ({ columns, index, hasCheckbox, hasOverflowMenu }) => {
	const { length } = columns;
	const total = hasCheckbox && hasOverflowMenu
		? length + 1
		: (hasCheckbox || hasOverflowMenu ? length : length - 1);
	const location = hasCheckbox ? index + 1 : index;
	const isFirst = location === 0;
	const isSecond = location === 1;
	const isSecondToLast = location === total - 1;
	const isLast = location === total;

	switch (true) {
		case isFirst: return 'first';
		case isLast: return 'last';
		case isSecond && isSecondToLast: return 'middle';
		case isSecond: return 'second';
		case isSecondToLast: return 'secondtolast';
		default: return '';
	}
};

const hasCellLocationThunk = location => option => location === option;

export const createCellLocationClasses = location => {
	const hasCellLocation = hasCellLocationThunk(location);
	const { first, last, second, secondtolast } = cellClassNames;

	return cn({
		[first]: hasCellLocation('first'),
		[last]: hasCellLocation('last'),
		[`${second} ${secondtolast}`]: hasCellLocation('middle'),
		[second]: hasCellLocation('second'),
		[secondtolast]: hasCellLocation('secondtolast'),
	});
};

export const queryIsValidInteraction = (event) => {
	const spaceBar = 32;
	const enterKey = 13;
	const { keyCode, type } = event;
	const isClick = type === 'click';
	const isKeyboard = type === 'keydown' && (keyCode === spaceBar || keyCode === enterKey);

	return isClick || isKeyboard;
};

// Register an interaction on a Cell or Row providing there is not an predefined
// action residing in the location that was clicked.
const createInteractionHandler = (handler, data) => (event) => {
	const isValidInteraction = queryIsValidInteraction(event);
	const {target} = event;
	const isRow = target.classList.contains(`${NAME_SPACE}--row-link`);
	const isActionCell = !isRow && (() => {
		const isCell = target.classList.contains(`${NAME_SPACE}--cell`);
		const cellNode = isCell ? target : target.closest(`.${NAME_SPACE}--cell`);

		return !cellNode || cellNode.classList.contains(`${NAME_SPACE}--cell-action`);
	})();

	if (isValidInteraction && !isActionCell) {
		return handler(event, data);
	}
};

export const createInteractionProps = (handler, data) => {
	const interactionhandler = createInteractionHandler(handler, data);

	return {
		tabIndex: '0',
		role: 'button',
		onClick: interactionhandler,
		onKeyDown: interactionhandler,
	};
};

const createTruncationArea = (actionWidth, rootWidth, { hasCheckbox, hasOverflowMenu }) => {
	switch (true) {
		case hasCheckbox && hasOverflowMenu: return rootWidth - (actionWidth * 2);
		case hasCheckbox || hasOverflowMenu: return rootWidth - actionWidth;
		default: return rootWidth;
	}
};

const queryIsTruncated = ({ rootWidth }, props) => {
	const actionWidth = 50;
	const minColumnWidth = 80;
	const maxColumnWidth = 200;
	const { children: columns } = props;
	const totalColumns = columns.length;
	const truncationArea = createTruncationArea(actionWidth, rootWidth, props);
	const oneTruncatedColumn = Math.floor(truncationArea / totalColumns);
	const isTruncated = oneTruncatedColumn >= minColumnWidth && oneTruncatedColumn <= maxColumnWidth;

	return isTruncated;
};

const sortDataByKey = (data, isAsc, key) => {
	const comparison = isAsc
		? (a, b) => a[key] > b[key]
		: (a, b) => a[key] < b[key];

	return data.sort((a, b) => comparison(a, b) ? 1 : -1);
};

const flattenSuppliedData = (data, checkedIds) => {
	const scaffold = { data: [], checkedIds: [] };

	return (
		Object
			.keys(data)
			.reduce((acc, key) => {
				const row = data[key];
				const isChecked = checkedIds[key];

				return {
					data: [...acc.data, { ...row, _id: key }],
					checkedIds: isChecked ? [...acc.checkedIds, key] : acc.checkedIds,
				};
			}, scaffold)
	);
};

// Generates a className that renders a divider into a cell. We conditionally
// generate the divider based on the rows order in the cascade and if there are
// header cells currently in the layout.
const createDividerClasses = (hasHeader) =>
	(rowIndex) => (!rowIndex && hasHeader || rowIndex) && `${NAME_SPACE}--cell-divider`;

export const enrichProps = (state, props, { tableNode }) => {
	const { rootWidth } = state;
	const { children, activeSortKey, isSortAsc, customSort, isLoading } = props;
	const { data: flattenedData, checkedIds } = flattenSuppliedData(props.data, props.checkedIds);

	// If there is an "active sort key" in play then the data needs sorting. In
	// addition if there is a "custom sort" function supplied then we sort use that
	// to sort or fall back to our generic version.
	const sortedData = activeSortKey
		? (customSort || sortDataByKey)(flattenedData, isSortAsc, activeSortKey)
		: flattenedData;

	// If there is no header cell content then we remove the <head /> all together
	// from the table.
	const columns = Array.isArray(children) ? children : [children];
	const headCells = columns.filter(({ props: { head } }) => head);
	const hasHeader = Boolean(headCells.length);

	const tableWidth = tableNode && tableNode.clientWidth;

	// Even if truncation is requested we still need to ensure the columns will fall
	// under a min / max size threshold so that things do not look weird.
	const isTruncated = props.isTruncated && queryIsTruncated(state, props);

	// Even if a responsive table (horizontally scrolling) is requested we still
	// need to ensure its layout relevance by making sure truncation is not active
	// and that the table content overflows the component wrappers width.
	const isResponsive = props.isResponsive
		&& !isTruncated
		&& (rootWidth || 0) < (tableWidth || 0);

	// Pinned columns are only deemed relevant in a responsive context.
	const hasPinnedFirstColumn = props.hasPinnedFirstColumn && isResponsive;
	const hasPinnedLastColumn = props.hasPinnedLastColumn && isResponsive;

	// The hook to conditionally inject the "emptyStateComponent" prop.
	const isEmpty = Boolean(!sortedData.length && !isLoading);

	const createDividerClassesThunk = createDividerClasses(hasHeader);

	// We use Pointer Events to determine how to handle nested buttons and links
	// inside of cells. If we do not have Pointer Events in the browser then we use
	// the generic css implementation via a className hook.
	const hasPointerEvents = window.PointerEvent;

	return {
		...props,
		data: sortedData,
		checkedIds,
		columns,
		hasHeader,
		isTruncated,
		isEmpty,
		hasPinnedFirstColumn,
		hasPinnedLastColumn,
		createDividerClassesThunk,
		hasPointerEvents,
	};
};

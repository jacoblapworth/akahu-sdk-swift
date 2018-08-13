import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIIcon from '../../icon/XUIIcon';
import sortPathData from '@xero/xui-icon/icons/sort-single';
import {
	getCellLocation,
	createCellLocationClasses,
	queryIsValidInteraction,
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';
import TableData from './TableData';
import {ns} from "../../helpers/xuiClassNamespace";

const HEAD_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-heading-separator`;

class TableHead extends PureComponent {
	createCheckBoxCell = ({
		data,
		checkedIds,
		onCheckAllToggle,
		checkAllRowsLabel,
	}) => {
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			HEAD_CELL_CLASSES,
			createCellLocationClasses('first'),
		);
		const totalCheckIds = checkedIds.length;
		const totalData = data.length;
		const isDisabled = !totalData;
		const isChecked = Boolean(totalData && totalCheckIds === totalData);
		const isIndeterminate = Boolean(totalCheckIds && !isChecked);

		return (
			<TableData
				className={className}
				tabIndex="-1"
				isHead>
				{NBSP}
				{onCheckAllToggle && (
					<XUICheckbox
						isDisabled={isDisabled}
						isChecked={isChecked}
						isIndeterminate={isIndeterminate}
						className={`${NAME_SPACE}--checkbox-head`}
						onChange={onCheckAllToggle}
						tabIndex={0}
						isLabelHidden>
						{checkAllRowsLabel}
					</XUICheckbox>
				)}
			</TableData>
		);
	};

	createOverflowMenuCell = () => {
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			HEAD_CELL_CLASSES,
			createCellLocationClasses('last'),
		);

		return (
			<TableData
				className={className}
				isHead>
				{NBSP}
			</TableData>
		);
	};

	createSortButton = ({
		children,
		sortKey,
		activeSortKey,
		isSortAsc,
		onSortChange,
		...props,
	}) => {
		const isSortActive = activeSortKey && activeSortKey === sortKey;
		const interactionhandler = event => queryIsValidInteraction(event) && onSortChange(sortKey);
		const className = cn(
			props.className,
			`${NAME_SPACE}--sortbutton`,
			isSortActive && `${NAME_SPACE}--sortbutton-active`
		);
		const content = (
			<div>
				<span>{children}</span>

				<XUIIcon
					icon={sortPathData}
					className={`${NAME_SPACE}--sortbutton-icon`}
					rotation={isSortAsc ? null : 180}
				/>
			</div>
		);

		return createElement(TableData, {
			...props,
			className,
			role: 'button',
			onClick: interactionhandler,
			onKeyDown: interactionhandler,
		}, content);
	};

	createGenericCell = ({
		head,
		index,
		activeSortKey,
		isSortAsc,
		onSortChange,
		cellLocation,
		ensureCellVisibility,
	}) => {
		const {
			children,
			sortKey,
			className: suppliedClasses,
		} = head.props;
		const key = `column-cell-${index}`;
		const isHead = true;
		const onFocus = ensureCellVisibility;
		const className = cn(
			HEAD_CELL_CLASSES,
			createCellLocationClasses(cellLocation),
			suppliedClasses,
		);

		return sortKey
			? this.createSortButton({
					children,
					key,
					className,
					sortKey,
					activeSortKey,
					isSortAsc,
					onSortChange,
					onFocus,
				})
			: createElement(TableData, {
					isHead,
					key,
					className,
					onFocus,
				}, <span>{children}</span>)
	};

	render = () => {
		const {
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
		} = this.props;

		return (
			<thead className={`${NAME_SPACE}--head`}>
				<tr className={`${NAME_SPACE}--row ${ns}-text-align-left`}>

					{hasCheckbox && this.createCheckBoxCell({
						data,
						checkedIds,
						onCheckAllToggle,
						checkAllRowsLabel,
					})}

					{columns.map(({ props: { head } }, index) => (

						this.createGenericCell({
							head,
							index,
							activeSortKey,
							isSortAsc,
							onSortChange,
							ensureCellVisibility,
							cellLocation: getCellLocation({
								columns, index, hasCheckbox, hasOverflowMenu,
							})
						})

					))}

					{hasOverflowMenu && this.createOverflowMenuCell()}

				</tr>
			</thead>
		);
	};
}

TableHead.propTypes = {

	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	columns: PropTypes.node.isRequired,
	ensureCellVisibility: PropTypes.func,

	// Checkbox.
	hasCheckbox: PropTypes.bool,
	checkedIds: PropTypes.array,
	onCheckAllToggle: PropTypes.func,
	checkAllRowsLabel: PropTypes.string,
	isCheckAllStatusChecked: PropTypes.bool,
	isCheckAllStatusIndeterminate: PropTypes.bool,

	// Overflow Menu.
	hasOverflowMenu: PropTypes.bool,

	// Sorting
	activeSortKey: PropTypes.string,
	isSortAsc: PropTypes.bool,
	onSortChange: PropTypes.func,

};

export default TableHead;

import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import XUICheckbox from '../../checkbox/XUICheckbox';
import XUIIcon from '../../icon/XUIIcon';
import sortPathData from '@xero/xui-icon/icons/sort-single';
import {
	cellPosition,
	createCellLocationClasses,
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';
import TableData from './TableData';
import {ns} from "../../helpers/xuiClassNamespace";

const HEAD_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-heading-separator`;

class TableHead extends PureComponent {
	createCheckBoxCell = (
		data,
		checkedIds,
		onCheckAllToggle
	) => {
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			HEAD_CELL_CLASSES,
			cellPosition.first
		);
		const totalCheckIds = checkedIds.length;
		const totalData = data.length;
		const isDisabled = !totalData;
		const isChecked = Boolean(totalData && totalCheckIds === totalData);
		const isIndeterminate = Boolean(totalCheckIds && !isChecked);

		return (
			<TableData
				className={className}
				isHead>
				{NBSP}
				{onCheckAllToggle && (
					<XUICheckbox
						isDisabled={isDisabled}
						isChecked={isChecked}
						isIndeterminate={isIndeterminate}
						className={`${NAME_SPACE}--checkbox-head`}
						onChange={onCheckAllToggle}
					/>
				)}
			</TableData>
		);
	};

	createOverflowMenuCell = () => {
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			HEAD_CELL_CLASSES,
			cellPosition.last
		);

		return (
			<TableData
				className={className}
				isHead>
				{NBSP}
			</TableData>
		);
	};

	createsortbutton = ({
		children,
		sortKey,
		isSortActive,
		isSortAsc,
		onSortChange,
	}) => {
		const buttonClassName = cn(
			`${NAME_SPACE}--sortbutton`,
			isSortActive && `${NAME_SPACE}--sortbutton-active`
		);

		return (
			<button
				className={buttonClassName}
				onClick={() => onSortChange(sortKey)}
				type="button">

				<span>{children}</span>

				<XUIIcon
					path={sortPathData}
					className={`${NAME_SPACE}--sortbutton-icon`}
					rotation={isSortAsc ? null : 180}
					isInline
				/>

			</button>
		);
	};

	createGenericCell = ({
		head,
		index,
		activeSortKey,
		isSortAsc,
		onSortChange,
		cellLocationClasses
	}) => {
		const {
			children,
			sortKey,
			className: suppliedClasses,
		} = head.props;
		const key = `column-cell-${index}`;
		const isSortActive = activeSortKey && activeSortKey === sortKey;
		const isHead = true;
		const className = cn(
			HEAD_CELL_CLASSES,
			cellLocationClasses,
			suppliedClasses,
		);
		const content = sortKey
			? this.createsortbutton({
				children,
				sortKey,
				isSortActive,
				isSortAsc,
				onSortChange,
			})
			: <span>{children}</span>;

		return createElement(TableData, { isHead, key, className }, content);
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
			hasOverflowMenu,
		} = this.props;

		return (
			<thead className={`${NAME_SPACE}--head`}>
				<tr className={`${NAME_SPACE}--row ${ns}-text-align-left`}>

					{hasCheckbox && this.createCheckBoxCell(data, checkedIds, onCheckAllToggle)}

					{columns.map(({ props: { head } }, index) => (

						this.createGenericCell({
							head,
							index,
							activeSortKey,
							isSortAsc,
							onSortChange,
							cellLocationClasses: createCellLocationClasses({
								columns,
								index,
								hasCheckbox,
								hasOverflowMenu,
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

	// Checkbox.
	hasCheckbox: PropTypes.bool,
	checkedIds: PropTypes.array,
	onCheckAllToggle: PropTypes.func,
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

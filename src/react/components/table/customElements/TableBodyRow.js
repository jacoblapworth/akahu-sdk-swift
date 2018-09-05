/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUICheckbox from '../../checkbox/XUICheckbox';
import {
	getCellLocation,
	createCellLocationClasses,
	queryIsValidInteraction,
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';
import OverflowMenu from './OverflowMenu';
import TableData from './TableData';
import { ns } from '../../helpers/xuiClassNamespace';

const BODY_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-padding-small`;

// TODO: Refactor the various "cell" types (generic, overflow and checkbox) into
// individual files for clarity.

class CheckBoxCell extends PureComponent {
	handleChange = event => {
		const { onCheckOneToggle, rowId } = this.props;

		onCheckOneToggle(event, rowId);
	};

	render() {
		const {
			isChecked,
			checkOneRowLabel,
			dividerClasses,
		} = this.props;
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			BODY_CELL_CLASSES,
			createCellLocationClasses('first'),
			dividerClasses,
		);

		return (
			<TableData
				className={className}
				tabIndex="-1"
			>
				{NBSP}
				<XUICheckbox
					className={`${NAME_SPACE}--checkbox-body`}
					isChecked={isChecked}
					onChange={this.handleChange}
					tabIndex={0}
					isGrouped
					isLabelHidden
				>
					{checkOneRowLabel}
				</XUICheckbox>
			</TableData>
		);
	}
}

CheckBoxCell.propTypes = {
	rowId: PropTypes.string.isRequired,
	isChecked: PropTypes.bool,
	onCheckOneToggle: PropTypes.func,
	checkOneRowLabel: PropTypes.string,
	dividerClasses: PropTypes.string,
};

class OverflowMenuCell extends PureComponent {
	render() {
		const { overflowMenuItems, overflowMenuTitle, dividerClasses } = this.props;
		const hasItems = Boolean(overflowMenuItems && overflowMenuItems.length);
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			BODY_CELL_CLASSES,
			createCellLocationClasses('last'),
			dividerClasses,
		);

		return (
			<TableData
				className={className}
				tabIndex="-1"
			>
				{NBSP}
				{hasItems && (
					<OverflowMenu
						items={overflowMenuItems}
						overflowMenuTitle={overflowMenuTitle}
					/>
				)}
			</TableData>
		);
	}
}

OverflowMenuCell.propTypes = {
	overflowMenuItems: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.bool,
	]),
	overflowMenuTitle: PropTypes.string,
	dividerClasses: PropTypes.string,
};

OverflowMenuCell.defaultProps = {
	overflowMenuItems: [],
};

class GenericCell extends PureComponent {
	handleInteraction = event => {
		const { handleCellInteraction, onCellClick } = this.props;
		handleCellInteraction(event, onCellClick);
	};

	render() {
		const {
			className: suppliedClasses,
			isRowLink,
			dividerClasses,
			ensureCellVisibility,
			children,
			onCellClick,
			hasWrapping,
			cellLocation,
		} = this.props;
		const isCellLink = !isRowLink && onCellClick;
		const role = isCellLink ? 'button' : undefined;
		const onClick = isCellLink ? this.handleInteraction : undefined;
		const onKeyDown = isCellLink ? this.handleInteraction : undefined;
		const className = cn(
			BODY_CELL_CLASSES,
			dividerClasses,
			createCellLocationClasses(cellLocation),
			suppliedClasses,
			{
				[`${NAME_SPACE}--cell-link`]: isCellLink,
				[`${NAME_SPACE}--cell-singleline`]: !hasWrapping || isRowLink,
			},
		);

		return (
			<TableData
				{...{
					className,
					onFocus: ensureCellVisibility,
					role,
					onClick,
					onKeyDown,
					// Unlike "rows", generic "cells" are always tab-able.
					tabIndex: '0',
				}}
			>
				{children}
			</TableData>
		);
	}
}

GenericCell.propTypes = {
	cellLocation: PropTypes.string,
	columnIndex: PropTypes.number,
	isRowLink: PropTypes.bool,
	dividerClasses: PropTypes.string,
	ensureCellVisibility: PropTypes.func,
	handleCellInteraction: PropTypes.func,
	onCellClick: PropTypes.func,
	hasWrapping: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node,
};

class TableBodyRow extends PureComponent {
	state = { hasPrecedence: false };

	removePrecedence = () => this.setPrecedence(false);
	addPrecedence = () => this.setPrecedence(true);
	setPrecedence = hasPrecedence => this.setState(() => ({ hasPrecedence }));

	// Register an interaction on a Row providing there is not an predefined
	// action residing in the location that was clicked. E.g clicking on a cell
	// that has a checkbox action in it should not trigger the interaction callback.
	handleRowInteraction = event => {
		const { onRowClick, rowData } = this.props;
		const { target, currentTarget } = event;
		const actionClassName = `${NAME_SPACE}--cell-action`;
		const isAction = (
			target.classList.contains(`${actionClassName}`)
			|| target.closest(`.${actionClassName}`)
		);
		const isValidInteraction = queryIsValidInteraction(event);

		if (!isAction && isValidInteraction) {
			onRowClick(event, rowData);
			currentTarget.focus();
			event.preventDefault();
		}
	};

	handleCellInteraction = (event, onCellClick) => {
		const { rowData } = this.props;
		const isValidInteraction = queryIsValidInteraction(event);

		if (isValidInteraction) {
			onCellClick(rowData);
			event.preventDefault();
		}
	};

	render = () => {
		const {
			rowData,
			rowIndex,
			columns,
			hasCheckbox,
			isChecked,
			onCheckOneToggle,
			checkOneRowLabel,
			onRowClick,
			shouldRowClick,
			hasOverflowMenu,
			createOverflowMenu,
			overflowMenuTitle,
			createDividerClasses,
			ensureCellVisibility,
		} = this.props;
		const isRowLink = Boolean(onRowClick && shouldRowClick(rowData));
		const {
			onClick,
			onKeyDown,
			tabIndex,
			role,
			onPointerOver,
			onPointerOut,
		} = (isRowLink ? {
			onClick: this.handleRowInteraction,
			onKeyDown: this.handleRowInteraction,
			tabIndex: '0',
			role: 'button',
			onPointerOver: this.addPrecedence,
			onPointerOut: this.removePrecedence,
		} : {});
		const dividerClasses = createDividerClasses(rowIndex);
		const rowClassName = cn(
			`${NAME_SPACE}--row`,
			{
				[`${NAME_SPACE}--row-link`]: isRowLink,
				[`${NAME_SPACE}--row-hasprecedence`]: this.state.hasPrecedence,
			},
		);

		return (
			<tr
				{...{
					className: rowClassName,
					onClick,
					onKeyDown,
					tabIndex,
					role,
					onPointerOver,
					onPointerOut,
				}}
			>

				{hasCheckbox && (
					<CheckBoxCell {...{
						rowId: rowData._id,
						isChecked,
						onCheckOneToggle,
						checkOneRowLabel,
						dividerClasses,
					}}
					/>
				)}

				{columns.map(({ props: { body: createBodyNode } }, columnIndex) => {
					const {
						props: {
							children,
							onCellClick,
							hasWrapping,
							className: cellClassName,
						},
					} = createBodyNode(rowData, columnIndex);
					const cellLocation = getCellLocation({
						columns, columnIndex, hasCheckbox, hasOverflowMenu,
					});

					return (
						<GenericCell {...{
							key: `row-cell-${columnIndex}`,
							handleCellInteraction: this.handleCellInteraction,
							className: cellClassName,
							children,
							cellLocation,
							columnIndex,
							isRowLink,
							dividerClasses,
							ensureCellVisibility,
							onCellClick,
							hasWrapping,
						}}
						/>
					);
				})}

				{hasOverflowMenu && (
					<OverflowMenuCell {...{
						overflowMenuItems: createOverflowMenu && createOverflowMenu(rowData),
						overflowMenuTitle,
						dividerClasses,
					}}
					/>
				)}

			</tr>
		);
	};
}

TableBodyRow.propTypes = {

	rowData: PropTypes.object.isRequired,
	rowIndex: PropTypes.number.isRequired,
	columns: PropTypes.node,
	ensureCellVisibility: PropTypes.func,

	// Divider.
	createDividerClasses: PropTypes.func,

	// Checkbox.
	hasCheckbox: PropTypes.bool,
	isChecked: PropTypes.bool,
	onCheckOneToggle: PropTypes.func,
	checkOneRowLabel: PropTypes.string,

	// Overflow Menu.
	hasOverflowMenu: PropTypes.bool,
	createOverflowMenu: PropTypes.func,
	overflowMenuTitle: PropTypes.string,

	// Interaction.
	onRowClick: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool,
	]),
	shouldRowClick: PropTypes.func,
};

export default TableBodyRow;

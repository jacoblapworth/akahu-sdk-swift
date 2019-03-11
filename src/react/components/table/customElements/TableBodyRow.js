import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
	getCellLocation,
	queryIsValidInteraction,
} from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import CheckBoxCell from './CheckBoxCell';
import OverflowMenuCell from './OverflowMenuCell';
import GenericCell from './GenericCell';

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

	createOverflowMenu = () => {
		const { rowData, createOverflowMenu } = this.props;
		return createOverflowMenu && createOverflowMenu(rowData);
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
						createOverflowMenu: this.createOverflowMenu,
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

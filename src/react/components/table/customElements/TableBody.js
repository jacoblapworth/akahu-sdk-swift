import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'
import XUICheckbox from '../../checkbox/XUICheckbox';
import {
	cellPosition,
	createCellLocationClasses,
	createInteractionProps,
	createRowClickCallback,
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';
import OverflowMenu from './OverflowMenu';
import TableData from './TableData';
import {ns} from "../../helpers/xuiClassNamespace";

const BODY_CELL_CLASSES = `${NAME_SPACE}--cell ${ns}-padding-small`;

class TableBody extends PureComponent {
	createCheckBoxCell = ({
		rowData,
		checkedIds,
		onCheckOneToggle,
		checkOneRowLabel,
		dividerClasses,
	}) => {
		const { _id } = rowData;
		const isChecked = checkedIds.indexOf(_id) >= 0;
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			BODY_CELL_CLASSES,
			cellPosition.first,
			dividerClasses,
		);

		return (
			<TableData className={className}>
				{NBSP}
				<XUICheckbox
					className={`${NAME_SPACE}--checkbox-body`}
					isChecked={isChecked}
					onChange={(event) => onCheckOneToggle(event, _id)}
					isLabelHidden
				>
				{checkOneRowLabel}
				</XUICheckbox>
			</TableData>
		);
	};

	createOverflowMenuCell = ({ rowData, createOverflowMenu, dividerClasses }) => {
		const items = createOverflowMenu && createOverflowMenu(rowData);
		const hasItems = Boolean(items && items.length);
		const className = cn(
			`${NAME_SPACE}--cell-action`,
			BODY_CELL_CLASSES,
			cellPosition.last,
			dividerClasses,
		);

		return (
			<TableData className={className}>
				{NBSP}
				{hasItems && <OverflowMenu {...{ items }} />}
			</TableData>
		);
	};

	createGenericCell = ({
		body: funcAsComponent,
		rowData,
		columnIndex,
		isRowLink,
		dividerClasses,
		cellLocationClasses,
	}) => {
		const body = funcAsComponent(rowData, columnIndex);
		const {
			children,
			onCellClick,
			hasWrapping,
			className: suppliedClasses,
		} = body.props;
		const key = `row-cell-${columnIndex}`;
		const uniqueInteraction = !isRowLink && onCellClick;
		const isCellLink = uniqueInteraction;
		const interactionProps = isCellLink && createInteractionProps(uniqueInteraction, rowData);
		const className = cn(
			BODY_CELL_CLASSES,
			dividerClasses,
			cellLocationClasses,
			suppliedClasses,
			{
				[`${NAME_SPACE}--cell-link`]: isCellLink,
				[`${NAME_SPACE}--cell-singleline`]: !hasWrapping || isRowLink,
			},
		);

		return createElement(TableData, { key, ...interactionProps, className }, children);
	};

	render = () => {
		const {
			data,
			columns,
			hasCheckbox,
			checkedIds,
			onCheckOneToggle,
			checkOneRowLabel,
			onRowClick,
			shouldRowClick,
			hasOverflowMenu,
			createOverflowMenu,
			createDividerClassesThunk,
		} = this.props;

		return (
			<tbody className={`${NAME_SPACE}--body`}>

				{data && data.map((rowData, rowIndex) => {
					const rowClickCallback = createRowClickCallback({shouldRowClick, rowData, onRowClick})
					const isRowLink = Boolean(rowClickCallback);
					const interactionProps = isRowLink && createInteractionProps(rowClickCallback, rowData);
					const dividerClasses = createDividerClassesThunk(rowIndex);
					const className = cn(
						`${NAME_SPACE}--row`,
						{ [`${NAME_SPACE}--row-link`]: isRowLink },
					);

					return (
						<tr
							{...interactionProps}
							key={`row-${rowIndex}`}
							className={className}>

							{hasCheckbox && this.createCheckBoxCell({
								rowData,
								checkedIds,
								onCheckOneToggle,
								checkOneRowLabel,
								dividerClasses,
							})}

							{columns.map(({ props: { body } }, columnIndex) => (

								this.createGenericCell({
									body,
									rowData,
									columnIndex,
									isRowLink,
									dividerClasses,
									cellLocationClasses: createCellLocationClasses({
										columns,
										index: columnIndex,
										hasCheckbox,
										hasOverflowMenu,
									})
								})

							))}

							{hasOverflowMenu && this.createOverflowMenuCell({
								rowData,
								createOverflowMenu,
								dividerClasses
								,
							})}

						</tr>
					);
				})}

			</tbody>
		);
	};
}

TableBody.propTypes = {

	data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	columns: PropTypes.node,

	// Divider.
	createDividerClassesThunk: PropTypes.func,

	// Checkbox.
	hasCheckbox: PropTypes.bool,
	checkedIds: PropTypes.array,
	onCheckOneToggle: PropTypes.func,
	checkOneRowLabel: PropTypes.string,

	// Overflow Menu.
	hasOverflowMenu: PropTypes.bool,
	createOverflowMenu: PropTypes.func,

	// Interaction.
	onRowClick: PropTypes.func,
	shouldRowClick: PropTypes.func,

};

export default TableBody;

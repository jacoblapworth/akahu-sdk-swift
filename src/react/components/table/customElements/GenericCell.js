import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
	createCellLocationClasses,
	cellClassNames
} from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';

import TableData from './TableData';

const BODY_CELL_CLASSES = `${cellClassNames.cell} ${cellClassNames.defaultLayout}`;

export default class GenericCell extends PureComponent {
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

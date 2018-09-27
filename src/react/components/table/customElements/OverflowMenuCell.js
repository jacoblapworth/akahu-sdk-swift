import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
	createCellLocationClasses,
	cellClassNames
} from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';

import TableData from './TableData';
import OverflowMenu from './OverflowMenu';

const BODY_CELL_CLASSES = `${cellClassNames.cell} ${cellClassNames.defaultLayout}`;

export default class OverflowMenuCell extends PureComponent {
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

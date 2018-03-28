import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NBSP } from '../helpers/constants';

class HeadData extends PureComponent {
	render = () => {
		const { children, ...props } = this.props;

		return (
			<th {...props}>
				{children || NBSP}
			</th>
		);
	};
}

HeadData.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

class BodyData extends PureComponent {
	render = () => {
		const { children, ...props } = this.props;

		return (
			<td {...props}>
				{children || NBSP}
			</td>
		);
	};
}

BodyData.propTypes = {

	children: PropTypes.node,
	className: PropTypes.string,

	// Interaction.
	tabIndex: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	role: PropTypes.string,
	onClick: PropTypes.func,
	onKeyDown: PropTypes.func,

};

const TableData = ({ isHead, ...props }) => (
	isHead ? <HeadData {...props} /> : <BodyData {...props} />
);

TableData.propTypes = {
	isHead: PropTypes.bool,
}

export default TableData;

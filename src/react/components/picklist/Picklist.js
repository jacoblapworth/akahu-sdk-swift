import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class Picklist extends Component {
	render() {
		const { children, className, id, onKeyDown, onMouseDown, secondaryProps } = this.props;

		return (
			<ul className={cn('xui-picklist', className)} id={id} onKeyDown={onKeyDown} onMouseDown={onMouseDown} {...secondaryProps}>
				{children}
			</ul>
		)
	}
}

Picklist.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string,
	onKeyDown: PropTypes.func,
	onMouseDown: PropTypes.func,
	secondaryProps: PropTypes.object
};

Picklist.defaultProps = {
	secondaryProps : {
		role:"group"
	}
};

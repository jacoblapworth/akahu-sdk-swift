import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * Presentational (aka dumb) component used to display a selectable list of Pickitems.
 *
 * @export
 * @class Picklist
 * @extends {Component}
 */
export default class Picklist extends Component {
	render() {
		const { children, className, id, onKeyDown, onMouseDown, secondaryProps, defaultLayout } = this.props;
		const classes = cn('xui-picklist', className, {
			'xui-picklist-layout': defaultLayout,
		});

		return (
			<ul className={classes} id={id} onKeyDown={onKeyDown} onMouseDown={onMouseDown} {...secondaryProps}>
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
	secondaryProps: PropTypes.object,
	defaultLayout: PropTypes.bool,
};

Picklist.defaultProps = {
	defaultLayout: true,
	secondaryProps : {
		role:"group"
	},
};

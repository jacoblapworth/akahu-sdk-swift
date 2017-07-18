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
		const {
			children,
			className,
			id,
			onKeyDown,
			onMouseDown,
			secondaryProps,
			defaultLayout,
			isHorizontal
		} = this.props;

		const classes = cn('xui-picklist', className, {
			'xui-picklist-layout': defaultLayout && !isHorizontal,
			'xui-picklist-horizontal': isHorizontal
		});

		return (
			<ul
				className={classes}
				id={id}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
				{...secondaryProps}
			>
				{children}
			</ul>
		)
	}
}

Picklist.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/* Id to be applied to the root HTML element */
	id: PropTypes.string,
	/* Keydown handler function added to the root HTML element */
	onKeyDown: PropTypes.func,
	/* Mousedown handler function added to the root HTML element */
	onMouseDown: PropTypes.func,
	/* Additional props to pass to the root HTML element */
	secondaryProps: PropTypes.object,
	/* Whether to add the default layout class */
	defaultLayout: PropTypes.bool,
	/* Whether to render as horizontal pickitems */
	isHorizontal: PropTypes.bool
};

Picklist.defaultProps = {
	defaultLayout: true,
	secondaryProps : {
		role:"group"
	},
};

import '../helpers/xuiGlobalChecks';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from "../helpers/xuiClassNamespace";

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
			isHorizontal,
			qaHook
		} = this.props;

		const classes = cn(
			`${ns}-picklist`,
			className,
			(defaultLayout && !isHorizontal) && `${ns}-picklist-layout`,
			isHorizontal && `${ns}-picklist-horizontal`
		);

		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
		// Deferring the fix for this until we determine how to change the surface of pickitems & picklists
		return (
			<ul
				{...secondaryProps}
				className={classes}
				id={id}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
				data-automationid={qaHook}
			>
				{children}
			</ul>
		)
		/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
	}
}

Picklist.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
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

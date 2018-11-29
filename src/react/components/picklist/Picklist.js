import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { picklistClassName, sizeVariants } from './private/constants';

import '../../../sass/7-components/_navigation.picklist.scss';
import Pickitem from './Pickitem';
import { getPropsFromFirstChildOrList } from './private/helpers';
import NestedPicklistContainer from './NestedPicklistContainer';
import SelectBoxOption from '../select-box/SelectBoxOption';

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
			qaHook,
			shouldTruncate,
		} = this.props;

		const listLevelProps = getPropsFromFirstChildOrList(children, this.props);

		const newChildren = React.Children.map(children, child =>
			(child && (
				child.type === Pickitem ||
				child.type === SelectBoxOption ||
				child.type === NestedPicklistContainer)
				? React.cloneElement(child, {
					size: listLevelProps.listSize,
					isMultiselect: listLevelProps.listMultiselect,
					_isHorizontal: isHorizontal,
					shouldTruncate: // This is ok to be set at either the item level or the list level.
						child.props.shouldTruncate === undefined ? shouldTruncate : child.props.shouldTruncate,
				})
				: child));

		const classes = cn(
			`${picklistClassName}`,
			className,
			(defaultLayout && !isHorizontal) && `${picklistClassName}-layout`,
			isHorizontal && `${picklistClassName}-horizontal`,
			`${picklistClassName}-${listLevelProps.listSize}`,
		);

		/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
		// Deferring the fix for this until we determine how to change the surface
		// of pickitems & picklists
		return (
			<ul
				{...secondaryProps}
				className={classes}
				id={id}
				onKeyDown={onKeyDown}
				onMouseDown={onMouseDown}
				data-automationid={qaHook}
			>
				{newChildren}
			</ul>
		);
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
	isHorizontal: PropTypes.bool,
	/** Size variant */
	size: PropTypes.oneOf(sizeVariants),
	/** When true checkboxes will be added to the layout of the child components. */
	isMultiselect: PropTypes.bool,
	/** Whether to truncate text instead of wrapping. */
	shouldTruncate: PropTypes.bool,
};

Picklist.defaultProps = {
	defaultLayout: true,
	secondaryProps: {
		role: 'group',
	},
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from "../helpers/xuiClassNamespace";

export default class NestedPicklist extends PureComponent {
	render() {
		const { children, className, qaHook, secondaryProps } = this.props;
		return (
			<ul
				{...secondaryProps}
				className={cn(className, `${ns}-submenu ${ns}-submenu-layout`)}
				id={this.context.id}
				data-automationid={qaHook}
			>
				{children}
			</ul>
		);
	}
}

NestedPicklist.propTypes = {
	qaHook: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string,
	secondaryProps: PropTypes.object
};

NestedPicklist.defaultProps = {
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this component as the root node for
	 a nested list when traversing the children tree.
	 */
	_isGroup: true,
	secondaryProps: {
		role: "group"
	}
};

NestedPicklist.contextTypes = {
	id: PropTypes.string
};

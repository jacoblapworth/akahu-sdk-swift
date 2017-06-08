import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import arrow from '@xero/xui-icon/icons/arrow';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';

export default class NestedPicklistTrigger extends PureComponent {
	render() {
		const { className, qaHook, isHighlighted, onClick, onMouseOver, children, isSelected, secondaryProps } = this.props;
		const { id } = this.context;
		const hasChildren = children && (typeof children !== 'string' || children.trim().length > 0);
		const classNames = cn(className, 'xui-submenu-uicontrol', {
			'xui-pickitem--body': hasChildren,
			'xui-pickitem-is-hovered': isHighlighted,
			'xui-pickitem-is-selected': isSelected
		});
		return (
			<label
				ref={n => this.rootNode = n}
				data-automationid={qaHook}
				htmlFor={`${id}-checkbox`}
				className={classNames}
				onClick={onClick}
				onMouseOver={onMouseOver}
				{...secondaryProps}
			>
				{hasChildren ? <span className="xui-pickitem--text">{children}</span> : null}
				<XUIIcon className="xui-submenu-uicontrol--icon" path={arrow} />
			</label>
		);
	}
}

NestedPicklistTrigger.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	className: PropTypes.string,
	isHighlighted: PropTypes.bool,
	isSelected: PropTypes.bool,
	onClick: PropTypes.func,
	onMouseOver: PropTypes.func,
	secondaryProps: PropTypes.object
};

NestedPicklistTrigger.defaultProps = {
	split: false,
	isHighlighted: false,
	secondaryProps: {
		"aria-label": "Toggle submenu",
		"role": "button"
	},
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this component as a menu item.
	 */
	_isMenuItem: true,
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this component a thing that opens and
	 closes nested picklists
	 */
	_isGroupTrigger: true
};

NestedPicklistTrigger.contextTypes = {
	id: PropTypes.string
};

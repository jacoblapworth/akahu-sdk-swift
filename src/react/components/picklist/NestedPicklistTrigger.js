import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import arrow from '@xero/xui-icon/icons/arrow';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import {ns} from "../helpers/xuiClassNamespace";

export default class NestedPicklistTrigger extends PureComponent {
	render() {
		const { className, qaHook, isHighlighted, onClick, onMouseOver, children, isSelected, ariaLabel, secondaryProps } = this.props;
		const { id } = this.context;
		const hasChildren = children && (typeof children !== 'string' || children.trim().length > 0);
		const classNames = cn(
			className,
			`${ns}-submenu-uicontrol`,
			hasChildren && `${ns}-pickitem--body`,
			isHighlighted && `${ns}-pickitem-is-hovered`,
			isSelected && `${ns}-pickitem-is-selected`
		);

		return (
			<label
				{...secondaryProps}
				htmlFor={`${id}-checkbox`}
				ref={n => this.rootNode = n}
				data-automationid={qaHook}
				className={classNames}
				onClick={onClick}
				onKeyDown={onClick}
				onMouseOver={onMouseOver}
				onFocus={onMouseOver}
				// TODO: fix this overall interaction between the label and checkbox in NestedPicklistContainer.js
				role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
				tabIndex={0}
				aria-label={ariaLabel}
			>
				{hasChildren ? <label className={`${ns}-pickitem--text`}>{children}</label> : null}
				<XUIIcon className={`${ns}-submenu-uicontrol--icon`} icon={arrow} isBoxed />
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
	ariaLabel: PropTypes.string,
	secondaryProps: PropTypes.object
};

NestedPicklistTrigger.defaultProps = {
	split: false,
	isHighlighted: false,
	ariaLabel: 'Toggle submenu',
	secondaryProps: {
		role: "button"
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

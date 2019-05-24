import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import arrow from '@xero/xui-icon/icons/arrow';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';
import {
	pickitemClassName,
	sideElementClassName,
	itemTextClassName,
	itemBodyClassName,
} from './private/constants';

export default class NestedPicklistTrigger extends PureComponent {
	render() {
		const {
			className,
			qaHook,
			isHighlighted,
			onClick,
			onMouseOver,
			children,
			isSelected,
			ariaLabel,
			secondaryProps,
			leftElement,
		} = this.props;
		const { id } = this.context;
		const hasChildren = children && (typeof children !== 'string' || children.trim().length > 0);
		const classNames = cn(
			className,
			`${ns}-submenu-uicontrol`,
			hasChildren && itemBodyClassName,
			isHighlighted && `${pickitemClassName}-is-hovered`,
			isSelected && `${pickitemClassName}-is-selected`,
		);
		const wrappedLeft = leftElement && (
			<span className={sideElementClassName}>
				{leftElement}
			</span>
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
				// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
				role="button" 
				tabIndex={0}
				aria-label={ariaLabel}
			>
				{wrappedLeft}
				{hasChildren ? <span className={itemTextClassName}>{children}</span> : null}
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
	secondaryProps: PropTypes.object,
	/** Content to be added to the left of the pickitem. */
	leftElement: PropTypes.node,
};

NestedPicklistTrigger.defaultProps = {
	isHighlighted: false,
	ariaLabel: 'Toggle submenu',
	secondaryProps: {
		role: 'button',
	},
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize
	 this component as a menu item.
	 */
	_isMenuItem: true, // eslint-disable-line
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize
	 this component a thing that opens and closes nested picklists
	 */
	_isGroupTrigger: true, // eslint-disable-line
};

NestedPicklistTrigger.contextTypes = {
	id: PropTypes.string,
};

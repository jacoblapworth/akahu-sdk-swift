import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PickitemBody from './PickitemBody';

/**
 * Presentational (aka dumb) component used to display a selectable item in a
 * list of items.
 *
 * @export
 * @class Pickitem
 * @extends {PureComponent}
 */
export default class Pickitem extends PureComponent {
	render() {
		const pickItem = this;
		const {
			id,
			isSelected,
			className,
			onBlur,
			onFocus,
			onKeyDown,
			onClick,
			onMouseOver,
			ariaRole,
			disableSelectedStyles,
			multiselect,
			href,
			children,
			qaHook,
			checkboxClassName,
			isHighlighted,
			isDisabled,
			isSplit,
			ariaLabel,
			target,
			shouldTruncate
		} = pickItem.props;

		const classes = cn('xui-pickitem', className, {
			'xui-pickitem-is-hovered': isHighlighted,
			'xui-pickitem-is-selected': isSelected && !disableSelectedStyles,
			'xui-pickitem--multiselect': multiselect,
			'xui-pickitem--split': isSplit,
			'xui-is-disabled': isDisabled
		});
		const listeners = !isDisabled ? { onClick, onBlur, onFocus, onKeyDown, onMouseOver } : null;


		const Tag = isSplit ? 'div' : 'li';

		return (
			<Tag
				className={classes}
				aria-selected={multiselect ? isSelected : null}
				role={ariaRole}
				id={id}
				data-automationid={qaHook}
				aria-label={ariaLabel}
			>
				<PickitemBody
					shouldTruncate={shouldTruncate}
					isSelected={isSelected}
					multiselect={multiselect}
					href={href}
					checkboxClassName={checkboxClassName}
					target={target}
					{...listeners}
				>
					{children}
				</PickitemBody>
			</Tag>
		)
	}
}

Pickitem.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/** Is the item selected? */
	isSelected: PropTypes.bool,
	/** Is the item highlighted? */
	isHighlighted: PropTypes.bool,
	/** Callback when the pick item is clicked. */
	onClick: PropTypes.func,
	/** Callback on blur of the pick item */
	onBlur: PropTypes.func,
	/** Callback on focus of the pick item */
	onFocus: PropTypes.func,
	/** Callback on keydown of the pick item */
	onKeyDown: PropTypes.func,
	/** Callback when this item is selected by a parent component */
	onSelect: PropTypes.func,
	/** Link to be used in child, will render an a tag if used and button if not */
	href: PropTypes.string,
	/** ARIA attribute defining what purpose this item serves. */
	ariaRole: PropTypes.string,
	/** The value associated with this PickItem which will be passed to the onSelect callbacks here and in the StatefulPicklist */
	value: PropTypes.any,
	/** For nested children such as checkboxes, icons or groups selected styles should be disabled. */
	disableSelectedStyles: PropTypes.bool,
	/** When true a checkbox will be added to the layout of the child component. */
	multiselect: PropTypes.bool,
	/** Classes can be passed toe the XUICheckbox component in PickItemBody. */
	checkboxClassName: PropTypes.string,
	/** The automation-id to add to the item */
	qaHook: PropTypes.string,
	/** The disabled behaviour and styles are applied when this is true. */
	isDisabled: PropTypes.bool,
	/** Whether or not this pickitem sits next to a NestedPicklistToggle */
	isSplit: PropTypes.bool,
	/** Optional label to add to a pickitem */
	ariaLabel: PropTypes.string,
	/** When a link is preferred, this target prop can be used on the <a> tag*/
	target: PropTypes.string,
	/** Whether to truncate text instead of wrapping */
	shouldTruncate: PropTypes.bool
};

Pickitem.defaultProps = {
	ariaRole: 'option',
	isSelected: false,
	disableSelectedStyles: false,
	isSplit: false,
	isDisabled: false,
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this component as a menu item.
	 */
	_isMenuItem: true
};

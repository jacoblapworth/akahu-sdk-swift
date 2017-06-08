import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import PickitemBody from './PickitemBody';

export default class Pickitem extends PureComponent {
	render() {
		const pickItem = this;
		const classBase = 'xui-pickitem';
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
			target
		} = pickItem.props;

		const classes = cn(classBase, className, {
			[`${classBase}-is-hovered`]: isHighlighted,
			[`${classBase}-is-selected`]: isSelected && !disableSelectedStyles,
			[`${classBase}--split`]: isSplit,
			'xui-is-disabled': isDisabled
		});
		const listeners = !isDisabled ? {onClick, onBlur, onFocus, onKeyDown, onMouseOver} : null;


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
	/** @property {Boolean} [isSelected=false] true if the item is selected */
	isSelected: PropTypes.bool,
	/** @property {Boolean} [isHighlighted=false] true if the item is highlighted */
	isHighlighted: PropTypes.bool,
	/** @property {Function} [onClick] callback when the pick item is clicked. */
	onClick: PropTypes.func,
	/** @property {Function} [onBlur] callback on blur of the pick item */
	onBlur: PropTypes.func,
	/** @property {Function} [onFocus] callback on focus of the pick item */
	onFocus: PropTypes.func,
	/** @property {Function} [onKeyDown] callback on keydown of the pick item */
	onKeyDown: PropTypes.func,
	/** @property {Function} [onSelect] callback when this item is selected by a parent component */
	onSelect: PropTypes.func,
	/** @property {String} link to be used in child, will render an a tag if used and button if not */
	href: PropTypes.string,
	/** @property {String} [href] defaults to `option` for the aria role attribute, but can be defined for other uses. */
	ariaRole: PropTypes.string,
	/** @property {*} [value] The value associated with this PickItem which will be passed to the onSelect callbacks here and in the StatefulPicklist */
	value: PropTypes.any,
	/** @property {Boolean} [disableSelectedStyles=false] false by default, for nested children such as checkboxes, icons or groups selected styles should be disabled. */
	disableSelectedStyles: PropTypes.bool,
	/** @property {Boolean} [multiselect=false]false by default, when true a checkbox will be added to the layout of the child component. */
	multiselect: PropTypes.bool,
	/** @property {String} [checkboxClassName]Means classes can be passed toe the XUICheckbox component in PickItemBody. */
	checkboxClassName: PropTypes.string,
	/** @property {String} [qaHook] the automation-id to add to the item */
	qaHook: PropTypes.string,
	/** @property {Boolean} [isDisabled=false] false by default, the disabled behaviour and styles are applied when this is true. */
	isDisabled: PropTypes.bool,
	/** @property {Boolean} [isSplit=false] Whether or not this pickitem sits next to a NestedPicklistToggle */
	isSplit: PropTypes.bool,
	/** @property {string} [ariaLabel] optional label to add to a pickitem */
	ariaLabel: PropTypes.string,
	/** @property {String} When a link is preferred, this target prop can be used on the <a> tag*/
	target: PropTypes.string
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

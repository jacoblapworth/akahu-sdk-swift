import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pickitem from '../picklist/Pickitem';
import { ns } from '../helpers/xuiClassNamespace';

export default class SelectBoxOption extends PureComponent {
	render() {
		const {
			children,
			truncatedText,
			onClick,
			onSelect,
			id,
			showCheckboxes,
			value,
			optionClasses,
			isDisabled,
			isSelected,
			isHighlighted,
			onBlur,
			onFocus,
			onKeyDown,
			href,
			ariaRole,
			onMouseOver,
			qaHook,
		} = this.props;
		const isText = typeof children[0] === 'string';
		const shouldTruncateChildren = isText && truncatedText;
		const contents = shouldTruncateChildren
			? <span className={`${ns}-text-truncated`}>{children}</span>
			: children;
		return (
			<Pickitem
				{...{
					onClick,
					onSelect,
					id,
					value,
					isSelected,
					isHighlighted,
					isDisabled,
					onBlur,
					onFocus,
					onKeyDown,
					href,
					ariaRole,
					onMouseOver,
					qaHook,
				}}
				className={optionClasses}
				isMultiselect={showCheckboxes}
			>
				{contents}
			</Pickitem>
		);
	}
}

SelectBoxOption.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,

	/** Restrict SelectBoxOption children which are strings to one line */
	truncatedText: PropTypes.bool,

	/** Callback to be executed after a selection is made */
	onSelect: PropTypes.func,

	/** Additional classes to be applied to the  option insides */
	optionClasses: PropTypes.string,

	/** render the option disabled */
	isDisabled: PropTypes.bool,

	/** The value associated with this option */
	value: PropTypes.any.isRequired,

	/** Do the dropdown options show checkboxes */
	showCheckboxes: PropTypes.bool,

	/** true if the item is selected */
	isSelected: PropTypes.bool,
	/** true if the item is highlighted */
	isHighlighted: PropTypes.bool,
	/** callback when the pick item is clicked. */
	onClick: PropTypes.func,
	/** callback on blur of the pick item */
	onBlur: PropTypes.func,
	/** callback on focus of the pick item */
	onFocus: PropTypes.func,
	/** callback on keydown of the pick item */
	onKeyDown: PropTypes.func,
	/** callback for mouseover event */
	onMouseOver: PropTypes.func,
	/** link to be used in child, will render an a tag if used and button if not */
	href: PropTypes.string,
	/** defaults to `option` for the aria role attribute, but can be defined for other uses. */
	ariaRole: PropTypes.string,
	/** The automation-id to add to the item */
	qaHook: PropTypes.string,
};

SelectBoxOption.defaultProps = {
	isSelected: false,
	isHighlighted: false,
	showCheckboxes: false,
	isDisabled: false,
	truncatedText: false,
	ariaRole: 'option',
	/*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this
	 component as a menu item.
	 */
	_isMenuItem: true, // eslint-disable-line
};

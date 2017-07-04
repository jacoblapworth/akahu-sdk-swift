import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Pickitem from '../picklist/Pickitem';

export default class SelectBoxOption extends PureComponent {
	render() {
		const props = this.props;
		const isText = typeof props.children[0] === 'string';
		const shouldTruncateChildren = isText && props.truncatedText;
		const children = props.children;
		const contents = shouldTruncateChildren ? <span className="xui-text-truncated">{children}</span> : children;
		return (
			<Pickitem
				onClick={props.onClick}
				onSelect={props.onSelect}
				id={props.id}
				multiselect={props.showCheckboxes}
				value={props.value}
				className={props.optionClasses}
				disabled={props.isDisabled}
				isSelected={props.isSelected}
				isHighlighted={props.isHighlighted}
				isDisabled={props.isDisabled}
				onBlur={props.onBlur}
				onFocus={props.onFocus}
				onKeyDown={props.onKeyDown}
				href={props.href}
				ariaRole={props.ariaRole}
				onMouseOver={props.onMouseOver}
			>
				{contents}
			</Pickitem>
		);
	}
}

SelectBoxOption.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,

	/** @type {truncatedText} [truncatedText=false] Restrict SelectBoxOption children which are strings to one line */
	truncatedText: PropTypes.bool,

	/** @property {onSelect} Callback to be executed after a selection is made */
	onSelect: PropTypes.func,

	/** @property {String} [optionClasses] Additional classes to be applied to the  option insides */
	optionClasses: PropTypes.string,

	/** @property {Boolean} [isDisabled=false] render the option disabled */
	isDisabled: PropTypes.bool,

	/** @property {*} The value associated with this option */
	value: PropTypes.any.isRequired,

	/** @property {Boolean} [showCheckboxes=false] Do the dropdown options show checkboxes */
	showCheckboxes: PropTypes.bool,

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
	/** @property {Function} [onMouseOver] callback for mouseover event */
	onMouseOver: PropTypes.func,
	/** @property {String} link to be used in child, will render an a tag if used and button if not */
	href: PropTypes.string,
	/** @property {String} defaults to `option` for the aria role attribute, but can be defined for other uses. */
	ariaRole: PropTypes.string
};

SelectBoxOption.defaultProps = {
	isSelected: false,
	isHighlighted: false,
	showCheckboxes: false,
	isDisabled: false,
	truncatedText: false,
	defaultLayout: true,
	_isMenuItem: true
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIPickitem from '../picklist/XUIPickitem';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUISelectBoxOption extends PureComponent {
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
    const contents = shouldTruncateChildren ? (
      <span className={`${ns}-select--option-truncated`}>{children}</span>
    ) : (
      children
    );
    return (
      <XUIPickitem
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
      </XUIPickitem>
    );
  }
}

XUISelectBoxOption.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,

  /** Restrict `XUISelectBoxOption` children which are strings to one line */
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
  /** callback when the pickitem is clicked. */
  onClick: PropTypes.func,
  /** callback on blur of the pickitem */
  onBlur: PropTypes.func,
  /** callback on focus of the pickitem */
  onFocus: PropTypes.func,
  /** callback on keydown of the pickitem */
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

XUISelectBoxOption.defaultProps = {
  isSelected: false,
  isHighlighted: false,
  showCheckboxes: false,
  isDisabled: false,
  truncatedText: false,
  ariaRole: 'option',
  /*
	 DO NOT REMOVE
	 This property is needed so that the stateful picklist will properly recognize this
	 component as a menu item.
	 */
  _isMenuItem: true, // eslint-disable-line
};
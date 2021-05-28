import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIPickitem from '../picklist/XUIPickitem';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUISelectBoxOption extends PureComponent {
  render() {
    const {
      children,
      truncateText,
      onClick,
      onSelect,
      id,
      showCheckboxes,
      value,
      optionClassName,
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
    const shouldTruncateChildren = isText && truncateText;
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
        className={optionClassName}
        isMultiselect={showCheckboxes}
      >
        {contents}
      </XUIPickitem>
    );
  }
}

XUISelectBoxOption.propTypes = {
  /** defaults to `option` for the aria role attribute, but can be defined for other uses. */
  ariaRole: PropTypes.string,

  children: PropTypes.node,

  /** link to be used in child, will render an a tag if used and button if not */
  href: PropTypes.string,

  id: PropTypes.string.isRequired,

  /** render the option disabled */
  isDisabled: PropTypes.bool,

  /** true if the item is highlighted */
  isHighlighted: PropTypes.bool,

  /** true if the item is selected */
  isSelected: PropTypes.bool,

  /** callback on blur of the pickitem */
  onBlur: PropTypes.func,

  /** callback when the pickitem is clicked. */
  onClick: PropTypes.func,

  /** callback on focus of the pickitem */
  onFocus: PropTypes.func,

  /** callback on keydown of the pickitem */
  onKeyDown: PropTypes.func,

  /** callback for mouseover event */
  onMouseOver: PropTypes.func,

  /** Callback to be executed after a selection is made */
  onSelect: PropTypes.func,

  /** Additional classes to be applied to the  option insides */
  optionClassName: PropTypes.string,

  /** The automation-id to add to the item */
  qaHook: PropTypes.string,

  /** Do the dropdown options show checkboxes */
  showCheckboxes: PropTypes.bool,

  /** Truncate `XUISelectBoxOption` children which are strings to one line */
  truncateText: PropTypes.bool,

  /** The value associated with this option */
  value: PropTypes.any.isRequired,
};

XUISelectBoxOption.defaultProps = {
  ariaRole: 'option',
  isDisabled: false,
  isHighlighted: false,
  isSelected: false,
  showCheckboxes: false,
  truncateText: false,
  /*
	 DO NOT REMOVE
	 This property is needed so that the stateful picklist will properly recognize this
	 component as a menu item.
	 */
  _isMenuItem: true, // eslint-disable-line
};

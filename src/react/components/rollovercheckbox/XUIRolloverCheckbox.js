import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUICheckbox from '../checkbox/XUICheckbox';

import { baseClass } from './private/constants';

export default class XUIRolloverCheckbox extends PureComponent {
  state = {
    isMouseOver: false,
  };

  _checkbox = React.createRef();

  /**
   * @public
   *
   * Handler attached to the target element for setting mouse over state to true.
   */
  onMouseEnter = () => {
    if (this.props.isCheckboxHidden) {
      this.setState({
        isMouseOver: true,
      });
    }
  };

  /**
   * @public
   *
   * Handler attached to the target element for setting mouse over state to false.
   */
  onMouseLeave = () => {
    this.setState({
      isMouseOver: false,
    });
  };

  /**
   * @public
   *
   * Handler attached to the target element for setting focus state.
   */
  onFocus = () => {
    this.setState({
      hasFocus: true,
    });
  };

  /**
   * @public
   *
   * Handler attached to the target element for setting focus state to false.
   */
  onBlur = () => {
    this.setState({
      hasFocus: false,
    });
  };

  /**
   * @public
   *
   * Method to allow for programmatic triggering of the click event on the checkbox
   */
  triggerCheckboxClick = () => {
    this._checkbox.current?._input.current.click();
  };

  /**
   * @public
   *
   * Handler passed to the CheckboxToggle so it can be called on change of the checkbox.
   * Also retians the checked state of the list item.
   * @param {Event} e
   */
  onSelect = e => {
    const { onSelect } = this.props;
    onSelect && onSelect(e, this);
  };

  render() {
    const {
      isChecked,
      isDisabled,
      className,
      id,
      rolloverComponent,
      qaHook,
      isCheckboxHidden,
      label,
      ariaLabelledBy,
      checkboxSize,
    } = this.props;
    const { isMouseOver, hasFocus } = this.state;

    const showRollover = isCheckboxHidden && !isMouseOver && !hasFocus && !!rolloverComponent;

    return (
      <div
        className={cn(
          `${baseClass}--target`,
          isDisabled && `${baseClass}--target-disabled`,
          className,
        )}
        data-automationid={qaHook}
        id={id}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="presentation"
      >
        <div className={cn(baseClass, `${baseClass}-has-${checkboxSize}-checkbox`)}>
          <div className={(!showRollover && `${baseClass}-hidden`) || undefined}>
            {rolloverComponent}
          </div>
          <XUICheckbox
            _isRollOver
            checkboxElementClassName={`${baseClass}--checkbox`}
            className={cn(
              showRollover && `${baseClass}-hidden`,
              `${baseClass}--styledcheckboxradio`,
            )}
            isChecked={isChecked}
            isDisabled={isDisabled}
            isLabelHidden
            labelId={ariaLabelledBy}
            onChange={this.onSelect}
            qaHook={qaHook && `${qaHook}--checkbox`}
            ref={this._checkbox}
            size={checkboxSize}
            tabIndex={0}
          >
            {label}
          </XUICheckbox>
        </div>
      </div>
    );
  }
}

XUIRolloverCheckbox.propTypes = {
  /** Optionally provide the id of an element that provides a label for the checkbox */
  ariaLabelledBy: PropTypes.string,
  /** Set the size of the checkbox revealed on rollover. Defaults to 'medium' */
  checkboxSize: PropTypes.oneOf(['medium', 'small', 'xsmall']),
  className: PropTypes.string,
  /** Id to apply to the wrapping div */
  id: PropTypes.string,
  /** Whether to show the checkbox instead of the rollover component */
  isCheckboxHidden: PropTypes.bool,
  /** Whether the checkbox is currently checked */
  isChecked: PropTypes.bool,
  /** Applies disabled styling when true */
  isDisabled: PropTypes.bool,
  /** Input label for accessibility purposes. Will not be visibly displayed. */
  label: PropTypes.node,
  /** Callback for when checkbox is selected */
  onSelect: PropTypes.func,
  qaHook: PropTypes.string,
  /** Component to render when isCheckboxHidden is true and mouse is not over the component */
  rolloverComponent: PropTypes.node,
};

XUIRolloverCheckbox.defaultProps = {
  checkboxSize: 'medium',
  isDisabled: false,
};

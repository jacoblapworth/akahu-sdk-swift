import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline from '../controlwrapper/XUIControlWrapperInline';
import generateIds, { getAriaAttributesInline } from '../helpers/ariaHelpers';
import XUITouchTarget from '../touchtarget/XUITouchTarget';
import labelRequiredWarning, { textChildOrLabelId } from '../helpers/labelRequiredWarning';

const baseClass = `${ns}-switch`;

/**
 * @function onLabelClick - Prevent 2 click events bubbling. Since our input is wrapped
 * inside a label, then clicking the label will also cause a new click event on the input,
 * which also bubbles up. If a consumer attaches an onClick event listener further up the
 * DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
  if (e.target.tagName !== 'INPUT') {
    e.stopPropagation();
  }
};

const XUISwitch = props => {
  const {
    children,
    className,
    hintMessage,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isInvalid,
    isLabelHidden,
    isReversed,
    labelClassName,
    labelId,
    name,
    onChange,
    qaHook,
    validationMessage,
    value,
    // size, TODO: add size options.
    // isGrouped, TODO: add grouping flag to match Checkbox/Radio. Maybe try context instead?
  } = props;

  const labelRef = createRef();

  // User can manually provide an id, or we will generate one.
  const wrapperIds = generateIds(labelId);

  const _isControlled = typeof isChecked === 'boolean';

  // We conditionally maintain state in order to support 'uncontrolled' component
  const [internalIsChecked, setInternalIsChecked] = useState(
    _isControlled ? null : !!isDefaultChecked,
  );

  const internalOnChange = e => {
    setInternalIsChecked(e.target.checked);
    onChange && onChange(e);
  };

  const isCheckedCalculated = _isControlled ? isChecked : internalIsChecked;
  const onChangeCalculated = _isControlled ? onChange : internalOnChange;

  // Other size options coming soon. See Checkbox/Radio for how this will work.
  // NB: Keeping this hard-coded, for the moment, so as not to expose a
  // useless prop in the API in XUI15.
  const calculatedSize = 'medium';

  const classes = cn(
    baseClass,
    isReversed && `${baseClass}-reversed`,
    isDisabled && `${baseClass}-is-disabled`,
  );

  const wrapperClasses = cn(
    className,
    `${baseClass}wrapper`,
    calculatedSize && `${baseClass}-${calculatedSize}`,
  );

  const labelClasses = cn(
    `${baseClass}--label`,
    calculatedSize && `${baseClass}--label-${calculatedSize}`,
    labelClassName,
  );

  const controlClasses = cn(
    `${baseClass}--control`,
    calculatedSize && `${baseClass}--control-${calculatedSize}`,
  );

  const inputProps = {
    type: 'checkbox',
    role: 'switch',
    className: `${baseClass}--checkbox`,
    'data-automationid': qaHook && `${qaHook}--input`,
    disabled: isDisabled || undefined,
    'aria-checked': isCheckedCalculated,
    checked: isCheckedCalculated,
    name,
    value,
    onChange: onChangeCalculated,
    ...getAriaAttributesInline(wrapperIds, props),
  };

  useEffect(() => {
    labelRequiredWarning(XUISwitch.name, textChildOrLabelId, [
      labelRef.current?.innerText && !isLabelHidden,
      typeof children?.[0] === 'string',
      labelId,
    ]);
  }, [children, isLabelHidden, labelId, labelRef]);

  return (
    <XUIControlWrapperInline
      fieldClassName={classes}
      label={children}
      labelClassName={labelClasses}
      labelRef={labelRef}
      messageClassName={`${baseClass}--message`}
      onClick={onLabelClick}
      rootClassName={wrapperClasses}
      wrapperIds={wrapperIds}
      {...{
        qaHook,
        isInvalid,
        validationMessage,
        hintMessage,
        isLabelHidden,
      }}
    >
      <input {...inputProps} />
      <div className={controlClasses} data-automationid={qaHook && `${qaHook}--switch`}>
        <XUITouchTarget />
      </div>
    </XUIControlWrapperInline>
  );
};

export default XUISwitch;

XUISwitch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Determines whether the switch is checked or unchecked.
   * This makes the switch a controlled component.
   * Omitting the isChecked prop will make it an uncontrolled component. */
  isChecked: PropTypes.bool,
  /** Used to provide an uncontrolled switch component. If a value is passed to the
   * isChecked prop, this prop will be ignored. */
  isDefaultChecked: PropTypes.bool,
  /** Determines whether the switch is enabled or disabled */
  isDisabled: PropTypes.bool,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Prevents the label element from being displayed on the page. Label is still
   * accessible to screen readers. */
  isLabelHidden: PropTypes.bool,
  /** The label and control are displayed in reverse order */
  isReversed: PropTypes.bool,
  /** Additional class names on the span (pseudo-label) element  */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** Name attribute for the input */
  name: PropTypes.string,
  /** Fires when the switch is turned on or off. No longer required. */
  onChange: PropTypes.func,
  qaHook: PropTypes.string,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** Value attribute for the input */
  value: PropTypes.string,
};

XUISwitch.defaultProps = {
  isDisabled: false,
  isLabelHidden: false,
  isReversed: false,
};

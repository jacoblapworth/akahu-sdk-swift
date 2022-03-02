import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline from '../controlwrapper/XUIControlWrapperInline';
import generateIds, { getAriaAttributesInline } from '../helpers/ariaHelpers';
import XUITouchTarget from '../touchtarget/XUITouchTarget';
import labelRequiredError, { textChildOrLabelId } from '../helpers/labelRequiredError';
import shouldRender from '../helpers/shouldRender';

/**
 * @function handleLabelClick - Prevent 2 click events bubbling. Since our input is
 * wrapped inside a label, then clicking the label will also cause a new click event
 * on the input, which also bubbles up. If a consumer attaches an onClick event listener
 * further up the DOM, we don't want it to be fired twice.
 *
 * @private
 */
const onLabelClick = e => {
  if (e.target.tagName !== 'INPUT') {
    e.stopPropagation();
  }
};

/**
 * @function buildSvgRadio - If triggered with a custom icon path, build svg radio
 * @param qaHook - Optional hook label
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 *
 */
const buildSvgRadio = (qaHook, { radioElementClassName, iconMain }) => {
  const svgClasses = cn(`${ns}-icon`, radioElementClassName);
  return (
    <div className={`${ns}-iconwrapper`}>
      <svg
        className={svgClasses}
        data-automationid={qaHook && `${qaHook}--icon`}
        height={iconMain.height}
        viewBox={`0 0 ${iconMain.width} ${iconMain.height}`}
        width={iconMain.width}
      >
        <path className={`${baseClass}--focus-outer`} d={iconMain.path} role="presentation" />
        <path className={`${baseClass}--focus`} d={iconMain.path} role="presentation" />
        <path className={`${baseClass}--main`} d={iconMain.path} role="presentation" />
      </svg>
      <XUITouchTarget />
    </div>
  );
};

/**
 * @function buildHtmlRadio - build the HTML version of the radio control
 * @param qaHook - Optional hook label
 * @param className - Optional classname to add to html version of radio
 * @param calculatedSize - String to specify the size of the radio
 *
 */
const buildHtmlRadio = (qaHook, className, calculatedSize) => {
  const htmlClasses = cn(
    `${baseClass}--radio`,
    className,
    calculatedSize && `${baseClass}--radio-${calculatedSize}`,
  );
  return (
    <div className={htmlClasses} data-automationid={qaHook && `${qaHook}--radio`}>
      <XUITouchTarget />
    </div>
  );
};

/**
 * @function buildRadio - given the radio props supplied, select which radio
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of radio
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 * @param calculatedSize - String to specify the size of the radio
 *
 */
const buildRadio = (qaHook, htmlClassName, svgSettings, calculatedSize) => {
  if (svgSettings.iconMain) {
    return buildSvgRadio(qaHook, svgSettings);
  }
  return buildHtmlRadio(qaHook, htmlClassName, calculatedSize);
};

const XUIRadio = props => {
  // User can manually provide an id, or we will generate one.
  const wrapperIds = generateIds({ labelId: props.labelId, id: props.id });
  const {
    children,
    className,
    hintMessage,
    iconMain,
    id,
    inputProps: radioInputProps,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isGrouped,
    isInvalid,
    isLabelHidden,
    isRequired,
    isReversed,
    labelClassName,
    name,
    onChange,
    qaHook,
    radioElementClassName,
    role,
    size,
    tabIndex,
    validationMessage,
    value,
  } = props;

  const labelRef = createRef();

  // Grouped inputs default to 'small'.
  const calculatedSize = (isGrouped && 'small') || size;

  const classes = cn(
    baseClass,
    isReversed && shouldRender(children) && !isLabelHidden && `${baseClass}-reversed`,
    isDisabled && `${ns}-styledcheckboxradio-is-disabled`,
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

  const inputProps = {
    ...radioInputProps,
    type: 'radio',
    disabled: isDisabled,
    required: isRequired,
    tabIndex,
    name,
    onChange,
    value,
    id,
    ...getAriaAttributesInline(wrapperIds, props),
  };
  const svgSettings = {
    iconMain,
    radioElementClassName,
  };

  useEffect(() => {
    labelRequiredError(XUIRadio.name, textChildOrLabelId, [
      labelRef.current?.textContent && !isLabelHidden,
      typeof children?.[0] === 'string',
      props.labelId,
    ]);
  }, [children, isLabelHidden, labelRef, props.labelId]);

  if (typeof isChecked !== 'boolean') {
    inputProps.defaultChecked = !!isDefaultChecked;
  } else {
    inputProps.checked = isChecked;
    // checked prop without an onChange handler means this is readonly, so set that to prevent
    // warnings in the console.
    if (onChange == null) {
      inputProps.readOnly = true;
    }
  }

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
      <input
        className={cn(
          `${baseClass}--input`,
          inputProps.className,
          calculatedSize && `${baseClass}--input-${calculatedSize}`,
          radioElementClassName,
        )}
        data-automationid={qaHook && `${qaHook}--input`}
        role={role}
        {...inputProps}
      />
      {buildRadio(qaHook, radioElementClassName, svgSettings, calculatedSize)}
    </XUIControlWrapperInline>
  );
};

export default XUIRadio;

XUIRadio.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /** Hint message to show under the input */
  hintMessage: PropTypes.node,

  /** The icon path to use for the radio */
  iconMain: PropTypes.shape({
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }),

  id: PropTypes.string,
  /** Props to be spread onto the radio type of the input element itself */
  inputProps: PropTypes.object,

  /** The input is selected */
  isChecked: PropTypes.bool,

  /** Used to output an uncontrolled radio component.  If a value is passed to the
   * isChecked prop, this prop will be ignored. */
  isDefaultChecked: PropTypes.bool,

  /** The input is disabled */
  isDisabled: PropTypes.bool,

  /** Used by XUI components to state whether the radio is part of a group */
  isGrouped: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,

  /** Prevents the label element from being displayed on the page. Label is still
   * accessible to screen readers. */
  isLabelHidden: PropTypes.bool,

  /** The input is required for form submission */
  isRequired: PropTypes.bool,

  /** The label and control are displayed in reverse order */
  isReversed: PropTypes.bool,

  /** Additional class names on the span (pseudo-label) element  */
  labelClassName: PropTypes.string,

  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,

  /** The name to use as a reference for the value */
  name: PropTypes.string,

  /** onChange - The function to call when the control changes state */
  onChange: PropTypes.func,

  qaHook: PropTypes.string,

  /** Additional class names for the input and html/svg elements */
  radioElementClassName: PropTypes.string,

  /** Role to be applied for screen readers */
  role: PropTypes.string,

  /** Size variant. Defaults to medium */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),

  /** The tabindex property to place on the radio input */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,

  /** The value to return on form submission */
  value: PropTypes.string,
};

XUIRadio.defaultProps = {
  isDisabled: false,
  isLabelHidden: false,
  isRequired: false,
  isReversed: false,
  role: 'radio',
  size: 'medium',
};

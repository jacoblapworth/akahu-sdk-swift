import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline, {
  getAriaAttributes,
} from '../controlwrapper/XUIControlWrapperInline';
import generateIds from '../controlwrapper/helpers';
import XUITouchTarget from '../touchtarget/XUITouchTarget';

/**
 * @function setIndeterminate - Set the indeterminate DOM property of the given checkbox instance
 * @param xuiCheckbox - The checkbox instance for which to set the indeterminate DOM property
 */
const setIndeterminate = xuiCheckbox => {
  if (xuiCheckbox._input.current) {
    // TODO: Lint fix
    // eslint-disable-next-line no-param-reassign
    xuiCheckbox._input.current.indeterminate = xuiCheckbox.props.isIndeterminate;
  }
};

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

/**
 * @function buildSvgCheckbox - If triggered with a custom icon path, build svg checkbox
 * @param qaHook - Optional hook label
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 *
 */
const buildSvgCheckbox = (qaHook, { svgClassName, iconMain }) => {
  const svgClasses = cn(`${ns}-icon`, svgClassName);
  const createPathWithClass = className => (
    <path className={className} d={iconMain.path} role="presentation" />
  );
  return (
    <div className={`${ns}-iconwrapper`}>
      <svg
        className={svgClasses}
        data-automationid={qaHook && `${qaHook}--icon`}
        height={iconMain.height}
        viewBox={`0 0 ${iconMain.width} ${iconMain.height}`}
        width={iconMain.width}
      >
        {createPathWithClass(`${baseClass}--focus`)}
        {createPathWithClass(`${baseClass}--main`)}
      </svg>
      <XUITouchTarget />
    </div>
  );
};

/**
 * @function buildHtmlCheckbox - build the HTML version of the checkbox control
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 * @param calculatedSize - String to specify the size of the checkbox
 *
 */
const buildHtmlCheckbox = (qaHook, htmlClassName, calculatedSize) => {
  const htmlClasses = cn(
    `${baseClass}--checkbox`,
    htmlClassName,
    calculatedSize && `${baseClass}--checkbox-${calculatedSize}`,
  );
  return (
    <div className={htmlClasses} data-automationid={qaHook && `${qaHook}--checkbox`}>
      <XUITouchTarget />
    </div>
  );
};

/**
 * @function buildCheckbox - given the checkbox props supplied, select which checkbox
 * builder to trigger
 * @param qaHook - Optional hook label
 * @param htmlClassName - Optional classname to add to html version of checkbox
 * @param svgSettings - Object containing optional svg properties (classname, icon paths)
 * @param calculatedSize - String to specify the size of the checkbox
 *
 */
const buildCheckbox = (qaHook, htmlClassName, svgSettings, calculatedSize) => {
  if (svgSettings.iconMain) {
    return buildSvgCheckbox(qaHook, svgSettings);
  }
  return buildHtmlCheckbox(qaHook, htmlClassName, calculatedSize);
};

/**
 * Outputs a checkbox with custom XUI styling.
 *
 * @export
 * @class XUICheckbox
 * @extends {Component}
 */
export default class XUICheckbox extends PureComponent {
  // User can manually provide an id, or we will generate one.
  wrapperIds = generateIds(this.props.labelId);

  _input = React.createRef();

  componentDidMount() {
    setIndeterminate(this);
  }

  componentDidUpdate() {
    setIndeterminate(this);
  }

  render() {
    const {
      tabIndex,
      children,
      className,
      qaHook,
      iconMain,
      isDefaultChecked,
      isChecked,
      isDisabled,
      isRequired,
      isReversed,
      isLabelHidden,
      name,
      onChange,
      value,
      svgClassName,
      labelClassName,
      htmlClassName,
      isGrouped,
      isInvalid,
      validationMessage,
      hintMessage,
      size,
      _isRollOver,
      inputProps: checkboxInputProps,
    } = this.props;

    // Grouped inputs default to 'small'.
    const calculatedSize = (isGrouped && 'small') || size;

    const classes = cn(
      baseClass,
      _isRollOver && `${baseClass}-is-rollover`,
      isDisabled && `${baseClass}-is-disabled`,
      isReversed && `${baseClass}-reversed`,
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
      ...checkboxInputProps,
      type: 'checkbox',
      disabled: isDisabled,
      required: isRequired,
      tabIndex,
      name,
      onChange,
      value,
      ...getAriaAttributes(this.wrapperIds, this.props),
    };
    const svgSettings = {
      svgClassName,
      iconMain,
    };

    // If the user has not passed in anything for the isChecked prop, we need to set the
    // `defaultChecked` prop on the input in order to prevent React from outputting warnings
    // in the console.
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
        messageClassName={`${baseClass}--message`}
        onClick={onLabelClick}
        rootClassName={wrapperClasses}
        wrapperIds={this.wrapperIds}
        {...{
          qaHook,
          isInvalid,
          validationMessage,
          hintMessage,
          isLabelHidden,
        }}
      >
        <input
          ref={this._input}
          {...inputProps}
          className={cn(
            `${baseClass}--input`,
            inputProps.className,
            calculatedSize && `${baseClass}--input-${calculatedSize}`,
          )}
          data-automationid={qaHook && `${qaHook}--input`}
        />
        {buildCheckbox(qaHook, htmlClassName, svgSettings, calculatedSize)}
      </XUIControlWrapperInline>
    );
  }
}

XUICheckbox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** The icon path to use for the checkbox */
  iconMain: PropTypes.shape({
    path: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),

  /** The input is selected */
  isChecked: PropTypes.bool,

  /** The input is disabled */
  isDisabled: PropTypes.bool,

  /**
   * The input is indeterminate.  In order for this prop value to
   * stick, you MUST pass in isChecked={false} or a user clicking on this
   * will cause React to clear the indeterminate state.
   */
  isIndeterminate: PropTypes.bool,

  /** The input is required for form submission */
  isRequired: PropTypes.bool,

  /** The label and control are displayed in reverse order */
  isReversed: PropTypes.bool,

  /** Additional class names on the span (pseudo-label) element  */
  labelClassName: PropTypes.string,

  /** Prevents the label element from being displayed on the page. Label is still
   * accessible to screen readers. */
  isLabelHidden: PropTypes.bool,

  /** The name to use as a reference for the value */
  name: PropTypes.string,

  /** The function to call when the control changes state */
  onChange: PropTypes.func,

  /** The value to return on form submission */
  value: PropTypes.string,

  /** Additional class names on the svg element  */
  svgClassName: PropTypes.string,

  /** Additional class names for the html input */
  htmlClassName: PropTypes.string,

  /** The tab-index property to place on the checkbox */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Used to output an uncontrolled checkbox component. If a value is passed to the
   * isChecked prop, this prop will be ignored. */
  isDefaultChecked: PropTypes.bool,

  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,

  /** Used by XUI components to state whether the checkbox is part of a group */
  isGrouped: PropTypes.bool,

  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Size variant. Defaults to medium */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),
  /**
   * Whether this checkbox was generated as part of a rollover checkbox
   * @ignore
   */
  _isRollOver: PropTypes.bool,
  /** Props to be spread onto the checkbox element itself */
  inputProps: PropTypes.object,
};

XUICheckbox.defaultProps = {
  isLabelHidden: false,
  isDisabled: false,
  isIndeterminate: false,
  isRequired: false,
  isReversed: false,
  size: 'medium',
};

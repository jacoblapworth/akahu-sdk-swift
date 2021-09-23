import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import '../helpers/xuiGlobalChecks';
import { baseClass } from './constants';
import { ns } from '../helpers/xuiClassNamespace';
import XUIControlWrapperInline from '../controlwrapper/XUIControlWrapperInline';
import generateIds, { getAriaAttributesInline } from '../helpers/ariaHelpers';
import XUITouchTarget from '../touchtarget/XUITouchTarget';
import labelRequiredWarning, { textChildOrLabelId } from '../helpers/labelRequiredWarning';
import CheckboxRangeSelectorContext from './contexts/CheckboxRangeSelectorContext';
import shouldRender from '../helpers/shouldRender';

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
const buildSvgCheckbox = (qaHook, { checkboxElementClassName, iconMain }) => {
  const svgClasses = cn(`${ns}-icon`, checkboxElementClassName);
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
 * @param className - Optional classname to add to html version of checkbox
 * @param calculatedSize - String to specify the size of the checkbox
 * @param onAnimationEnd - Callback for onAnimationEnd
 *
 */
const buildHtmlCheckbox = (qaHook, className, calculatedSize, onAnimationEnd) => {
  const htmlClasses = cn(
    `${baseClass}--checkbox`,
    className,
    calculatedSize && `${baseClass}--checkbox-${calculatedSize}`,
  );
  return (
    <div
      className={htmlClasses}
      data-automationid={qaHook && `${qaHook}--checkbox`}
      onAnimationEnd={onAnimationEnd}
    >
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
 * @param onAnimationEnd - Callback for onAnimationEnd
 *
 */
const buildCheckbox = (qaHook, htmlClassName, svgSettings, calculatedSize, onAnimationEnd) => {
  if (svgSettings.iconMain) {
    return buildSvgCheckbox(qaHook, svgSettings);
  }
  return buildHtmlCheckbox(qaHook, htmlClassName, calculatedSize, onAnimationEnd);
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

  labelRef = createRef();

  state = {
    shouldAnimate: true,
  };

  componentDidMount() {
    setIndeterminate(this);

    const { children, labelId, isLabelHidden, rangeSelectionGroup } = this.props;

    labelRequiredWarning(XUICheckbox.name, textChildOrLabelId, [
      this.labelRef.current?.innerText && !isLabelHidden,
      typeof children?.[0] === 'string',
      labelId,
    ]);

    if (!this.props.excludeFromRangeSelection) {
      this.context?.addCheckboxToRange?.(this._input, rangeSelectionGroup);
    }
  }

  componentWillUnmount() {
    if (!this.props.excludeFromRangeSelection) {
      this.context?.removeCheckboxFromRange?.(this._input, this.props.rangeSelectionGroup);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.isChecked && !this.props.isChecked) ||
      (prevProps.isDefaultChecked && !this.props.isDefaultChecked)
    ) {
      this.setShouldAnimate(true);
    }
    setIndeterminate(this);

    // Add the checkbox to range-selection if `excludeFromRangeSelection` is set to false
    if (prevProps.excludeFromRangeSelection && !this.props.excludeFromRangeSelection) {
      this.context?.addCheckboxToRange?.(this._input, this.props.rangeSelectionGroup);
    }

    // Remove the checkbox from range-selection if `excludeFromRangeSelection` is set to true
    if (!prevProps.excludeFromRangeSelection && this.props.excludeFromRangeSelection) {
      this.context?.removeCheckboxFromRange?.(this._input, prevProps.rangeSelectionGroup);
    }

    // Move the checkbox to the correct range-selection group when `rangeSelectionGroup` is changed
    if (prevProps.rangeSelectionGroup !== this.props.rangeSelectionGroup) {
      if (!prevProps.excludeFromRangeSelection && !this.props.excludeFromRangeSelection) {
        this.context?.removeCheckboxFromRange?.(this._input, prevProps.rangeSelectionGroup);
        this.context?.addCheckboxToRange?.(this._input, this.props.rangeSelectionGroup);
      }
    }
  }

  setShouldAnimate = state => {
    this.setState({
      shouldAnimate: state,
    });
  };

  handleChange = event => {
    // When it's unchecked, add the animation class back
    if (!event.target.checked) {
      this.setShouldAnimate(true);
    }
    this.props.onChange?.(event);
  };

  render() {
    const {
      checkboxElementClassName,
      children,
      className,
      hintMessage,
      iconMain,
      isChecked,
      isDefaultChecked,
      isDisabled,
      isGrouped,
      isIndeterminate,
      isInvalid,
      isLabelHidden,
      isRequired,
      isReversed,
      labelClassName,
      name,
      onChange,
      qaHook,
      size,
      tabIndex,
      validationMessage,
      value,
      _isRollOver,
      inputProps: checkboxInputProps,
    } = this.props;

    // Grouped inputs default to 'small'.
    const calculatedSize = (isGrouped && 'small') || size;

    const classes = cn(
      baseClass,
      _isRollOver && `${baseClass}-is-rollover`,
      isDisabled && `${baseClass}-is-disabled`,
      isReversed && shouldRender(children) && !isLabelHidden && `${baseClass}-reversed`,
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
      onChange: this.handleChange,
      value,
      ...getAriaAttributesInline(this.wrapperIds, this.props),
    };
    const svgSettings = {
      checkboxElementClassName,
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
        labelRef={this.labelRef}
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
            checkboxElementClassName,
          )}
          data-automationid={qaHook && `${qaHook}--input`}
        />
        {buildCheckbox(
          qaHook,
          cn(
            checkboxElementClassName,
            !this.state.shouldAnimate && `${baseClass}--checkbox-is-animationdone`,
          ),
          svgSettings,
          calculatedSize,
          // Remove the animation class when animation end
          () => !isIndeterminate && this.setShouldAnimate(false),
        )}
      </XUIControlWrapperInline>
    );
  }
}

XUICheckbox.contextType = CheckboxRangeSelectorContext;

XUICheckbox.propTypes = {
  /**
   * Whether this checkbox was generated as part of a rollover checkbox
   * @ignore
   */
  _isRollOver: PropTypes.bool,

  /** Additional class names for the input and html/svg elements */
  checkboxElementClassName: PropTypes.string,

  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Allows individual checkboxes to be excluded from range-selection (e.g. "Select all"
   * checkboxes).
   *
   * This prop only applies when the checkbox is part of a range-selection group (i.e. checkboxes in
   * groups, tables, picklists, or wrapped in XUICheckboxRangeSelector).
   */
  excludeFromRangeSelection: PropTypes.bool,

  /** Hint message to show under the input */
  hintMessage: PropTypes.node,

  /** The icon path to use for the checkbox */
  iconMain: PropTypes.shape({
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }),

  /** Props to be spread onto the checkbox element itself */
  inputProps: PropTypes.object,

  /** The input is selected */
  isChecked: PropTypes.bool,

  /** Used to output an uncontrolled checkbox component. If a value is passed to the
   * isChecked prop, this prop will be ignored. */
  isDefaultChecked: PropTypes.bool,

  /** The input is disabled */
  isDisabled: PropTypes.bool,

  /** Used by XUI components to state whether the checkbox is part of a group */
  isGrouped: PropTypes.bool,

  /**
   * The input is indeterminate.  In order for this prop value to
   * stick, you MUST pass in isChecked={false} or a user clicking on this
   * will cause React to clear the indeterminate state.
   */
  isIndeterminate: PropTypes.bool,

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

  /** The function to call when the control changes state */
  onChange: PropTypes.func,

  qaHook: PropTypes.string,

  /**
   * The range-selection (shift+click) group this checkbox belongs to. This is only needed if you
   * have multiple groups of checkboxes that need to be wrapped in the same element (e.g. checkboxes
   * in a table).
   */
  rangeSelectionGroup: PropTypes.string,

  /** Size variant. Defaults to medium */
  size: PropTypes.oneOf(['medium', 'small', 'xsmall']),

  /** The tab-index property to place on the checkbox */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,

  /** The value to return on form submission */
  value: PropTypes.string,
};

XUICheckbox.defaultProps = {
  isDisabled: false,
  isIndeterminate: false,
  isLabelHidden: false,
  isRequired: false,
  isReversed: false,
  size: 'medium',
};

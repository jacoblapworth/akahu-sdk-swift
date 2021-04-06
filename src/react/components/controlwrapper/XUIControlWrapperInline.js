import React from 'react';
import PropTypes from 'prop-types';

import LabelElement from './private/LabelElement';
import MessageElement from './private/MessageElement';

/**
 * @public
 * Get the collection of aria attributes to be applied to the control.
 * Independent of the component, for timing purposes.
 * @param {Object} ids - generated ids from ./helpers, including label and message ids
 * @param {Object} props - props of the parent control component
 * @returns {{aria-invalid: boolean, aria-label: string, aria-labelledby: string, aria-describedby: string}}
 */
export const getAriaAttributes = (ids, props) => {
  const {
    children, // This refers to children of the parent control component. Often plain text.
    isLabelHidden,
    validationMessage,
    hintMessage,
    labelId,
    isInvalid,
  } = props;

  // Create a "labelledby" attribute if there is child content, or if the user has provided an id.
  const ariaLabelledBy =
    (children != null && !isLabelHidden && ids.label) || (!children && labelId) || undefined;

  // Add hidden label if specified by the user, and provided content is a string.
  const ariaLabel =
    (children && isLabelHidden && typeof children[0] === 'string' && children) || undefined;

  // Create a "describedby" attribute if there is a hint or validation message to display.
  const ariaDescribedBy =
    ((hintMessage || (validationMessage && isInvalid)) && ids.message) || undefined;

  return {
    'aria-invalid': isInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  };
};

const XUIControlWrapperInline = ({
  children, // This refers to children of XUIControlWrapperInline. Usually the <input>
  fieldClassName,
  hintMessage,
  isInvalid,
  isLabelHidden,
  label,
  labelClassName,
  messageClassName,
  onClick,
  onKeyDown,
  qaHook,
  rootClassName,
  validationMessage,
  wrapperIds,
}) => (
  <div className={rootClassName}>
    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
    <label
      className={fieldClassName}
      data-automationid={qaHook}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
      <LabelElement
        isInline
        {...{
          labelClassName,
          label,
          isLabelHidden,
          qaHook,
          wrapperIds,
        }}
      />
    </label>
    <MessageElement
      className={messageClassName}
      {...{
        isInvalid,
        validationMessage,
        hintMessage,
        qaHook,
        wrapperIds,
      }}
    />
  </div>
);

export default XUIControlWrapperInline;

XUIControlWrapperInline.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.node,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Should label be applied as an aria-label, rather than being visibly displayed. */
  isLabelHidden(props, propName) {
    if (props[propName] && props.label && typeof props.label[0] !== 'string') {
      return new Error('To include a hidden label ensure the child is plain text.');
    }
    return null;
  },
  /** Label to show beside the input */
  label: PropTypes.node,
  /** Class names to add to the label */
  labelClassName: PropTypes.string,
  /** Class names to add to the hint and validation messages */
  messageClassName: PropTypes.string,
  /** Function to call on click inside the control */
  onClick: PropTypes.func,
  /** Function to call on keydown inside the control */
  onKeyDown: PropTypes.func,
  qaHook: PropTypes.string,
  /** Class names to be added to the root wrapper element */
  rootClassName: PropTypes.string,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** IDs generated by generateIds and passed in from the parent component */
  wrapperIds: PropTypes.shape({
    control: PropTypes.string,
    label: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

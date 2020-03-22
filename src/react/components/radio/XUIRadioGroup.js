import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIRadio from './XUIRadio';
import XUIControlWrapper, { getAriaAttributes } from '../controlwrapper/XUIControlWrapper';
import generateIds from '../controlwrapper/helpers';
import { baseClass } from './constants';

export default class XUIRadioGroup extends PureComponent {
  wrapperIds = generateIds(this.props.labelId);
  render() {
    const {
      children,
      className,
      qaHook,
      label,
      isLabelHidden,
      isFieldLayout,
      labelClassName,
      fieldClassName,
      isInvalid,
      validationMessage,
      hintMessage,
    } = this.props;

    const groupClasses = cn(
      className,
      `${baseClass}-group`,
      isInvalid && `${baseClass}-group-is-invalid`,
    );

    const childrenToRender = React.Children.map(children, child =>
      child.type === XUIRadio
        ? React.cloneElement(child, {
            isGrouped: true,
          })
        : child,
    );

    return (
      <XUIControlWrapper
        fieldClassName={fieldClassName}
        isGroup
        wrapperIds={this.wrapperIds}
        {...{
          qaHook,
          label,
          isInvalid,
          validationMessage,
          hintMessage,
          isFieldLayout,
          labelClassName,
          isLabelHidden,
        }}
      >
        <div
          className={groupClasses}
          data-automationid={qaHook}
          role="radiogroup"
          {...getAriaAttributes(this.wrapperIds, this.props, { isGroup: true })}
        >
          {childrenToRender}
        </div>
      </XUIControlWrapper>
    );
  }
}

XUIRadioGroup.propTypes = {
  children: PropTypes.node,
  /** Class names to be added to bordered grouping element */
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /** Label to show above the radio group, or for accessibility when the radio group label is hidden. Highly recommended */
  label: PropTypes.node,
  /** Whether the label should be visible or be applied as an aria-label. Defaults to visible */
  isLabelHidden: PropTypes.bool,
  /** Whether to use the field layout classes. Defaults to true. */
  isFieldLayout: PropTypes.bool,
  /** Class names to add to the label text element */
  labelClassName: PropTypes.string,
  /** Provide a specific label ID which will be used as the "labelleby" aria property */
  labelId: PropTypes.string,
  /** Class names to be added to the field wrapper element */
  fieldClassName: PropTypes.string,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  /** Validation message to show under the input if `isInvalid` is true */
  validationMessage: PropTypes.string,
  /** Hint message to show under the input */
  hintMessage: PropTypes.string,
};

XUIRadioGroup.defaultProps = {
  isFieldLayout: false,
};

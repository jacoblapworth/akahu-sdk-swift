import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import invalid from '@xero/xui-icon/icons/invalid';
import XUIIcon from '../../icon/XUIIcon';
import shouldRender from '../../helpers/shouldRender';

import { ns } from '../../helpers/xuiClassNamespace';

export default class MessageElement extends PureComponent {
  render() {
    const { className, isInvalid, validationMessage, hintMessage, qaHook, wrapperIds } = this.props;

    const showingErrorMessage = isInvalid && shouldRender(validationMessage);
    const messageElement = [validationMessage, hintMessage].some(shouldRender) && (
      <div
        className={cn(
          `${ns}-validation`,
          `${ns}-validation-layout`,
          showingErrorMessage && `${ns}-validation-is-invalid`,
          className,
        )}
        data-automationid={qaHook && `${qaHook}--message`}
        id={wrapperIds.message}
        role="status"
      >
        {showingErrorMessage ? (
          <>
            <XUIIcon icon={invalid} />
            {validationMessage}
          </>
        ) : (
          hintMessage
        )}
      </div>
    );
    return messageElement || null;
  }
}

MessageElement.propTypes = {
  className: PropTypes.string,
  /** Hint message to show near the input */
  hintMessage: PropTypes.node,
  /** Whether the current input value is invalid */
  isInvalid: PropTypes.bool,
  qaHook: PropTypes.string,
  /** Validation message to show near the input if `isInvalid` is true */
  validationMessage: PropTypes.node,
  /** IDs generated by generateIds and passed in from the parent component of the wrapper */
  wrapperIds: PropTypes.shape({
    control: PropTypes.string,
    label: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

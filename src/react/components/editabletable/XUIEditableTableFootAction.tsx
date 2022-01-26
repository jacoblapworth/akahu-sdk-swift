import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIButton from '../../button';

interface Props {
  buttonContent: string;
  buttonProps?: React.ComponentProps<typeof XUIButton>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  qaHook?: string;
}

const XUIEditableTableFootAction: React.FunctionComponent<Props> = ({
  buttonContent,
  buttonProps,
  onClick,
  qaHook,
}) => (
  <XUIButton
    {...buttonProps}
    onClick={onClick}
    qaHook={qaHook}
    size="small"
    variant="borderless-main"
  >
    {buttonContent}
  </XUIButton>
);

XUIEditableTableFootAction.propTypes = {
  /**
   * Content for row-adding button
   * <br />
   * Recommended English value: *Add new row*
   */
  buttonContent: PropTypes.string.isRequired,
  /**
   * Props for the row-adding button
   */
  buttonProps: PropTypes.object,
  /**
   * Function to be fired when the row-adding button is clicked
   */
  onClick: PropTypes.func,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFootAction;

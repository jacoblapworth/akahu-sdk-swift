import React from 'react';
import PropTypes from 'prop-types';
import exclamation from '@xero/xui-icon/icons/exclamation';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import { NAME_SPACE } from '../helpers/constants';
import XUIIcon from '../../icon/XUIIcon';

const CircularIcon = ({
  isComplete,
  isHardError,
  hardErrorAlert,
  completedIcon = checkboxCheck,
  errorIcon = exclamation,
}) => (
  <div className={`${NAME_SPACE}-icon`}>
    {isComplete && <XUIIcon icon={completedIcon} />}
    {isHardError
      ? hardErrorAlert || <XUIIcon className={`${NAME_SPACE}-icon-error`} icon={errorIcon} />
      : null}
  </div>
);

CircularIcon.propTypes = {
  isComplete: PropTypes.bool,
  isHardError: PropTypes.bool,
  hardErrorAlert: PropTypes.node,
  completedIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
  errorIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

export default CircularIcon;

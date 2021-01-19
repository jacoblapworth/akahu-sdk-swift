import React from 'react';
import PropTypes from 'prop-types';
import exclamation from '@xero/xui-icon/icons/exclamation';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import { NAME_SPACE } from '../helpers/constants';
import XUIIcon from '../../icon/XUIIcon';

const CircularIcon = ({ isComplete, isHardError, hardErrorAlert }) => (
  <div className={`${NAME_SPACE}-icon`}>
    {isComplete && <XUIIcon icon={checkboxCheck} />}
    {isHardError
      ? hardErrorAlert || <XUIIcon className={`${NAME_SPACE}-icon-error`} icon={exclamation} />
      : null}
  </div>
);

CircularIcon.propTypes = {
  hardErrorAlert: PropTypes.node,
  isComplete: PropTypes.bool,
  isHardError: PropTypes.bool,
};

export default CircularIcon;

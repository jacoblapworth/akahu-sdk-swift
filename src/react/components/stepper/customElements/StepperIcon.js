import React from 'react';
import PropTypes from 'prop-types';
import exclamation from '@xero/xui-icon/icons/exclamation';
import { NAME_SPACE } from '../helpers/constants';
import XUIIcon from '../../icon/XUIIcon';

const StepperIcon = ({ children, isComplete, isError }) => {
  let content;

  if (isError) {
    content = <XUIIcon className={`${NAME_SPACE}-icon-error`} icon={exclamation} />;
  } else if (isComplete) {
    content = (
      <svg className={`${NAME_SPACE}-icon-complete`} viewBox="0 0 9 7">
        <polygon points="0 4 1 3 3 5 8 0 9 1 3 7" />
      </svg>
    );
  } else {
    content = children;
  }

  return <div className={`${NAME_SPACE}-link-icon`}>{content}</div>;
};

export default StepperIcon;

StepperIcon.propTypes = {
  children: PropTypes.node,
  isComplete: PropTypes.bool,
  isError: PropTypes.bool,
};

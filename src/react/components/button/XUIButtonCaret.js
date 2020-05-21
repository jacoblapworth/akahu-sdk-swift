import React from 'react';
import caret from '@xero/xui-icon/icons/caret';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIButtonCaret({ className, ...props }) {
  return <XUIIcon {...props} className={cn(className, `${ns}-button--caret`)} />;
}

XUIButtonCaret.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Optional prop for users to modify the Button caret icon, if required for localisation.
   * Defaults to the caret icon, if no value is provided.
   */
  icon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

XUIButtonCaret.defaultProps = {
  icon: caret,
};

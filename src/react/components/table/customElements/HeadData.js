import React from 'react';
import PropTypes from 'prop-types';
import { NBSP } from '../helpers/constants';

const HeadData = ({ children, qaHook, ...props }) => (
  <th {...props} data-automationid={qaHook}>
    {children || NBSP}
  </th>
);

HeadData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  qaHook: PropTypes.string,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default HeadData;

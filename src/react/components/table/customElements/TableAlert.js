import React from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

const TableAlert = ({ children, qaHook }) => (
  <div className={`${NAME_SPACE}--alert`} data-automationid={qaHook}>
    {children}
  </div>
);

export default TableAlert;

TableAlert.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

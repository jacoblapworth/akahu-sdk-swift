import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const XUIEditableTable = ({ children, className, ...spreadProps }) => {
  return (
    <table className={cn(tableName, className)} {...spreadProps}>
      {children}
    </table>
  );
};

XUIEditableTable.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
};

export default XUIEditableTable;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { tableName } from './private/constants';

const XUIEditableTable = ({ children, className, ...spreadProps }) => {
  return (
    <div className={cn(tableName, className)} {...spreadProps}>
      {children}
    </div>
  );
};

XUIEditableTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default XUIEditableTable;

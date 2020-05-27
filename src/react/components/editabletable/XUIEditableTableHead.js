import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';
import { tableName } from './private/constants';

const baseName = `${tableName}head`;

const XUIEditableTableHead = ({ children, className, qaHook, ...spreadProps }) => {
  return (
    <thead className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {/* eslint-disable-next-line react/jsx-boolean-value */}
      <XUIEditableTableHeadContext.Provider value={true}>
        {children}
      </XUIEditableTableHeadContext.Provider>
    </thead>
  );
};

XUIEditableTableHead.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableHead;
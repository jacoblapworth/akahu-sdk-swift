import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';

const XUIEditableTableHead = ({ children, className, qaHook, ...spreadProps }) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}head`;

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
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableHead;

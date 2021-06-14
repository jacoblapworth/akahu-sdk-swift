import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';
import XUIEditableTableFootContext from './contexts/XUIEditableTableFootContext';

const XUIEditableTableFoot = ({ children, className, qaHook, ...spreadProps }) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}foot`;

  return (
    <tfoot className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {/* eslint-disable-next-line react/jsx-boolean-value */}
      <XUIEditableTableFootContext.Provider value={true}>
        {children}
      </XUIEditableTableFootContext.Provider>
    </tfoot>
  );
};

XUIEditableTableFoot.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableFoot;

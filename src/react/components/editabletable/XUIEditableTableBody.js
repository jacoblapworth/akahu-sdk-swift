import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableBody = ({ children, className, qaHook, ...spreadProps }) => {
  const {
    dragAndDrop: { rowPlaceholder },
  } = React.useContext(XUIEditableTableContext);
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}body`;

  return (
    <tbody className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
      {rowPlaceholder}
    </tbody>
  );
};

XUIEditableTableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableBody;

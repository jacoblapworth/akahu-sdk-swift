import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableHeadingCell = ({ children, className, qaHook, scope, ...spreadProps }) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}headingcell`;

  // TODO: sort out how we’re going to handle text alignment and add some logic here
  const cellClassName = cn(baseName, className, `${baseName}-leftaligned`);

  return (
    <th className={cellClassName} data-automationid={qaHook} scope={scope} {...spreadProps}>
      {children}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * The `scope` attribute added to the <th> element
   * to tell screenreaders exactly what cells the header is a header for
   * <br />
   * Default value is `col`, could be `colGroup` / `row` / `rowGroup`
   */
  scope: PropTypes.oneOf(['col', 'colGroup', 'row', 'rowGroup']),
};

export default XUIEditableTableHeadingCell;

XUIEditableTableHeadingCell.defaultProps = {
  scope: 'col',
};

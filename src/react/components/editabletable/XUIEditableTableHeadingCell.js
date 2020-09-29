import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';

const baseName = `${tableName}headingcell`;

const XUIEditableTableHeadingCell = ({ children, className, qaHook, scope, ...spreadProps }) => {
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

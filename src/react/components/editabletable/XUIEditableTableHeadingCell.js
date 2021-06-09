import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableClassContext from './contexts/XUIEditableTableClassContext';

const XUIEditableTableHeadingCell = ({
  children,
  className,
  qaHook,
  scope,
  inlineAlignment,
  ...spreadProps
}) => {
  const tableClassName = React.useContext(XUIEditableTableClassContext);
  const baseName = `${tableClassName}headingcell`;

  const cellClassName = cn(
    baseName,
    className,
    `${baseName}-${inlineAlignment === 'end' ? 'right' : 'left'}aligned`,
  );

  return (
    <th className={cellClassName} data-automationid={qaHook} scope={scope} {...spreadProps}>
      {children}
    </th>
  );
};

XUIEditableTableHeadingCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** Aligns the content of the cell on the inline (horizontal) axis. */
  inlineAlignment: PropTypes.oneOf(['end', 'start']),
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
  inlineAlignment: 'start',
  scope: 'col',
};

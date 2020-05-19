import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import trashIcon from '@xero/xui-icon/icons/trash';

import { tableName } from './private/constants';
import XUIEditableTableHeadingCell from './XUIEditableTableHeadingCell';
import XUIEditableTableCellIconButton from './XUIEditableTableCellIconButton';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';
import XUIEditableTableHeadContext from './contexts/XUIEditableTableHeadContext';

const baseName = `${tableName}row`;

// TODO: Replace this with $xui-control-size-standard when SASS tokens can be shared with React
const xuiControlSizeStandard = '40px';

const XUIEditableTableRow = ({ children, className, onRemove, qaHook, ...spreadProps }) => {
  const isHeaderRow = React.useContext(XUIEditableTableHeadContext);
  const {
    rowOptions: { isRemovable, removeButtonAriaLabel },
  } = React.useContext(XUIEditableTableContext);

  return (
    <tr className={cn(baseName, className)} data-automationid={qaHook} {...spreadProps}>
      {children}
      {isRemovable && isHeaderRow && (
        <XUIEditableTableHeadingCell style={{ width: xuiControlSizeStandard }} />
      )}
      {isRemovable && !isHeaderRow && (
        <XUIEditableTableCellIconButton
          ariaLabel={removeButtonAriaLabel}
          iconReference={trashIcon}
          onClick={onRemove}
          qaHook={`${qaHook}--button-remove`}
        />
      )}
    </tr>
  );
};

XUIEditableTableRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  onRemove: PropTypes.func,
  qaHook: PropTypes.string,
};

export default XUIEditableTableRow;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';

const XUIEditableTable = ({
  caption,
  children,
  className,
  qaHook,
  rowOptions,
  isContentWidth,
  ...spreadProps
}) => {
  return (
    <div className={cn(tableName, className, !isContentWidth && `${tableName}-responsive`)}>
      <table className={`${tableName}--table`} data-automationid={qaHook} {...spreadProps}>
        {caption && <caption className={`${tableName}--caption`}>{caption}</caption>}
        <XUIEditableTableContext.Provider value={{ rowOptions: { ...rowOptions } }}>
          {children}
        </XUIEditableTableContext.Provider>
      </table>
    </div>
  );
};

XUIEditableTable.propTypes = {
  /**
   * A non-visible description of the table for accessibility purposes. Particularly useful
   * for scrollable tables, to help screenreaders understand the scrollable element.
   */
  caption: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  qaHook: PropTypes.string,
  rowOptions: PropTypes.shape({ isRemovable: PropTypes.bool }),
  isContentWidth: PropTypes.bool,
};

export default XUIEditableTable;

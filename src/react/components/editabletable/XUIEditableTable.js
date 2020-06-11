import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';
import XUIEditableTableContext from './contexts/XUIEditableTableContext';

const XUIEditableTable = ({
  caption,
  children,
  className,
  columnWidths = [],
  maxWidth,
  minWidth,
  qaHook,
  rowOptions,
  style,
  ...spreadProps
}) => {
  const tableRef = React.useRef();
  const wrapperStyle =
    // If we omit this check, wrapperStyle is always a non-empty object, and passes extraneous (but harmless) props.
    // This is for tidiness purposes only.
    maxWidth || minWidth
      ? {
          maxWidth,
          minWidth,
          ...style,
        }
      : style;
  return (
    <div className={`${tableName}--wrapper`}>
      <div className={cn(tableName, className)} ref={tableRef} style={wrapperStyle}>
        <table {...spreadProps} className={`${tableName}--table`} data-automationid={qaHook}>
          {caption && <caption className={`${tableName}--caption`}>{caption}</caption>}
          {!!columnWidths.length && (
            <colgroup>
              {columnWidths.map(item => (
                <col style={{ width: item }} />
              ))}
              {rowOptions.isRemovable && <col style={{ width: '40px' }} />}
              {/* 40px is $xui-control-size-standard */}
            </colgroup>
          )}
          <XUIEditableTableContext.Provider value={{ rowOptions: { ...rowOptions }, tableRef }}>
            {children}
          </XUIEditableTableContext.Provider>
        </table>
      </div>
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
  rowOptions: PropTypes.shape({
    isRemovable: PropTypes.bool,
    removeButtonAriaLabel(props, propName, componentName) {
      if (!props.isRemovable) {
        return null;
      }

      if (!props[propName]) {
        return new Error(
          `The prop \`rowOptions.${propName}\` is required by \`${componentName}\` when using \`rowOptions.isRemovable\`, but its value is \`undefined\`.`,
        );
      }

      if (typeof props[propName] !== 'string') {
        return new Error(
          `Invalid prop \`${propName}\` of type \`${typeof props[
            propName
          ]}\` supplied to \`${componentName}\`, expected \`string\`.`,
        );
      }

      return null;
    },
  }),
  columnWidths: PropTypes.arrayOf(PropTypes.string),
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  style: PropTypes.object,
};

export default XUIEditableTable;

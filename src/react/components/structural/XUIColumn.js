import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { columnShortNames } from './private/constants';

const getClass = (width, suffix) => {
  let colClass = '';
  if (width) {
    colClass = `${ns}-column-${columnShortNames[width] || width}-of-12${suffix || ''}`;
  }
  return colClass;
};

const getAllClasses = ({ className, gridColumns, gridColumnsSmallUp, gridColumnsLargeUp }) =>
  cn(
    className,
    getClass(gridColumns),
    getClass(gridColumnsSmallUp, '-small-up'),
    getClass(gridColumnsLargeUp, '-large-up'),
  );

const XUIColumn = ({
  qaHook,
  children,
  className,
  gridColumns,
  gridColumnsSmallUp,
  gridColumnsLargeUp,
  ...spreadProps
}) => (
  <div
    {...spreadProps}
    className={getAllClasses({
      className,
      gridColumns,
      gridColumnsSmallUp,
      gridColumnsLargeUp,
    })}
    data-automationid={qaHook}
  >
    {children}
  </div>
);

XUIColumn.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Grid columns for the column to inhabit. Can be 1-12 or any of [full, half, third, quarter]
   */
  gridColumns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Grid columns at viewport > 600px wide. Can be 1-12 or any of [full, half, third, quarter]
   */
  gridColumnsSmallUp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Grid columns at viewport > 1000px wide. Can be 1-12 or any of [full, half, third, quarter]
   */
  gridColumnsLargeUp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

XUIColumn.defaultProps = {
  gridColumns: 12,
};

export { XUIColumn as default, getAllClasses };

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SortButton from './SortButton';
import TableData from './TableData';
import { createCellLocationClasses } from '../helpers/utilities';
import { HEAD_CELL_CLASSES } from '../helpers/constants';

const TableHeadGenericCell = ({
  activeSortKey,
  cellLocation,
  children,
  className: suppliedClasses,
  ensureCellVisibility,
  isSortAsc,
  onSortChange,
  sortKey,
  qaHook,
}) => {
  const isHead = true;
  const onFocus = ensureCellVisibility;
  const className = cn(HEAD_CELL_CLASSES, createCellLocationClasses(cellLocation), suppliedClasses);

  return sortKey ? (
    <SortButton
      {...{
        children,
        className,
        sortKey,
        activeSortKey,
        isSortAsc,
        onSortChange,
        onFocus,
        qaHook,
      }}
    />
  ) : (
    <TableData
      {...{
        isHead,
        className,
        onFocus,
        scope: 'col',
        qaHook,
      }}
    >
      <span>{children}</span>
    </TableData>
  );
};

TableHeadGenericCell.propTypes = {
  activeSortKey: PropTypes.string,
  cellLocation: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.node,
  ensureCellVisibility: PropTypes.func,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  qaHook: PropTypes.string,
  sortKey: PropTypes.string,
};

export default TableHeadGenericCell;

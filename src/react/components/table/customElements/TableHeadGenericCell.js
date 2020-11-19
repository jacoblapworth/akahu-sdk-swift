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
  className: PropTypes.node,
  children: PropTypes.node,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  cellLocation: PropTypes.string,
  ensureCellVisibility: PropTypes.func,
  qaHook: PropTypes.string,
};

export default TableHeadGenericCell;

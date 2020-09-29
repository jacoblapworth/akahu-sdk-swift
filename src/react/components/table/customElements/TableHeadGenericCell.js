import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SortButton from './SortButton';
import TableData from './TableData';
import { createCellLocationClasses } from '../helpers/utilities';
import { HEAD_CELL_CLASSES } from '../helpers/constants';

class TableHeadGenericCell extends PureComponent {
  render() {
    const {
      className: suppliedClasses,
      children,
      sortKey,
      activeSortKey,
      isSortAsc,
      onSortChange,
      cellLocation,
      ensureCellVisibility,
      sortbuttonIcon,
    } = this.props;
    const isHead = true;
    const onFocus = ensureCellVisibility;
    const className = cn(
      HEAD_CELL_CLASSES,
      createCellLocationClasses(cellLocation),
      suppliedClasses,
    );

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
          icon: sortbuttonIcon,
        }}
      />
    ) : (
      <TableData
        {...{
          isHead,
          className,
          onFocus,
          scope: 'col',
        }}
      >
        <span>{children}</span>
      </TableData>
    );
  }
}

TableHeadGenericCell.propTypes = {
  className: PropTypes.node,
  children: PropTypes.node,
  sortKey: PropTypes.string,
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  cellLocation: PropTypes.string,
  ensureCellVisibility: PropTypes.func,
  sortbuttonIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

export default TableHeadGenericCell;

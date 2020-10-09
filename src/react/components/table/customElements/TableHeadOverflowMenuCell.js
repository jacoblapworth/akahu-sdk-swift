import React from 'react';
import cn from 'classnames';
import { NAME_SPACE, NBSP, HEAD_CELL_CLASSES } from '../helpers/constants';
import { createCellLocationClasses } from '../helpers/utilities';
import TableData from './TableData';
import preventDefault from '../../helpers/preventDefault';

const TableHeadOverflowMenuCell = () => {
  const className = cn(
    `${NAME_SPACE}--cell-action`,
    HEAD_CELL_CLASSES,
    createCellLocationClasses('last'),
  );

  return (
    <TableData className={className} isHead onClick={preventDefault} onKeyPress={preventDefault}>
      {NBSP}
    </TableData>
  );
};

export default TableHeadOverflowMenuCell;

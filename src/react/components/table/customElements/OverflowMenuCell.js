import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { createCellLocationClasses, cellClassNames } from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';

import TableData from './TableData';
import OverflowMenu from './OverflowMenu';

const BODY_CELL_CLASSES = `${cellClassNames.cell} ${cellClassNames.defaultLayout}`;

const OverflowMenuCell = ({ createOverflowMenu, dividerClasses, overflowMenuTitle }) => {
  const overflowMenuItems = createOverflowMenu();
  const hasItems = Boolean(overflowMenuItems && overflowMenuItems.length);
  const className = cn(
    `${NAME_SPACE}--cell-action`,
    BODY_CELL_CLASSES,
    createCellLocationClasses('last'),
    dividerClasses,
  );

  return (
    <TableData className={className} tabIndex={-1}>
      {NBSP}
      {hasItems && (
        <OverflowMenu overflowMenuTitle={overflowMenuTitle}>{overflowMenuItems}</OverflowMenu>
      )}
    </TableData>
  );
};

export default OverflowMenuCell;

OverflowMenuCell.propTypes = {
  createOverflowMenu: PropTypes.func,
  overflowMenuTitle: PropTypes.string,
  dividerClasses: PropTypes.string,
};

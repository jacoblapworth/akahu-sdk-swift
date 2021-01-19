import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAME_SPACE, NBSP, HEAD_CELL_CLASSES } from '../helpers/constants';
import { createCellLocationClasses } from '../helpers/utilities';
import TableData from './TableData';
import XUICheckbox from '../../checkbox/XUICheckbox';

const TableHeadCheckBoxCell = ({
  checkAllRowsAriaLabel,
  checkedIds,
  onCheckAllToggle,
  totalData,
}) => {
  const className = cn(
    `${NAME_SPACE}--cell-action`,
    HEAD_CELL_CLASSES,
    createCellLocationClasses('first'),
  );
  const totalCheckIds = checkedIds.length;
  const isDisabled = !totalData;
  const isChecked = Boolean(totalData && totalCheckIds === totalData);
  const isIndeterminate = Boolean(totalCheckIds && !isChecked);

  return (
    <TableData className={className} isHead>
      {NBSP}
      {onCheckAllToggle && (
        <XUICheckbox
          className={`${NAME_SPACE}--checkbox-head`}
          isChecked={isChecked}
          isDisabled={isDisabled}
          isGrouped
          isIndeterminate={isIndeterminate}
          isLabelHidden
          onChange={onCheckAllToggle}
          tabIndex={0}
        >
          {checkAllRowsAriaLabel}
        </XUICheckbox>
      )}
    </TableData>
  );
};

TableHeadCheckBoxCell.propTypes = {
  checkAllRowsAriaLabel: PropTypes.string,
  checkedIds: PropTypes.array,
  onCheckAllToggle: PropTypes.func,
  totalData: PropTypes.number,
};

export default TableHeadCheckBoxCell;

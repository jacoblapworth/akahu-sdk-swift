/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { getCellLocation } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import { ns } from '../../helpers/xuiClassNamespace';
import TableHeadCheckBoxCell from './TableHeadCheckBoxCell';
import TableHeadOverflowMenuCell from './TableHeadOverflowMenuCell';
import TableHeadGenericCell from './TableHeadGenericCell';

const TableHead = ({
  activeSortKey,
  checkAllRowsAriaLabel,
  checkedIds,
  columns,
  data,
  ensureCellVisibility,
  hasCheckbox,
  hasOverflowMenu,
  isSortAsc,
  onCheckAllToggle,
  onSortChange,
}) => (
  <thead className={`${NAME_SPACE}--head`}>
    <tr className={`${NAME_SPACE}--row ${ns}-text-align-left`}>
      {hasCheckbox && (
        <TableHeadCheckBoxCell
          {...{
            totalData: data.length,
            checkedIds,
            onCheckAllToggle,
            checkAllRowsAriaLabel,
          }}
        />
      )}

      {columns.map(
        (
          {
            props: {
              head: {
                props: { children, sortKey, className, qaHook },
              },
            },
          },
          columnIndex,
        ) => (
          <TableHeadGenericCell
            {...{
              key: `column-cell-${columnIndex}`,
              activeSortKey,
              isSortAsc,
              onSortChange,
              ensureCellVisibility,
              sortKey,
              className,
              children,
              qaHook,
              cellLocation: getCellLocation({
                columns,
                columnIndex,
                hasCheckbox,
                hasOverflowMenu,
              }),
            }}
          />
        ),
      )}

      {hasOverflowMenu && <TableHeadOverflowMenuCell />}
    </tr>
  </thead>
);

export default TableHead;

TableHead.propTypes = {
  activeSortKey: PropTypes.string,
  checkAllRowsAriaLabel: PropTypes.node,
  checkedIds: PropTypes.array,
  columns: PropTypes.node.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ensureCellVisibility: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  hasOverflowMenu: PropTypes.bool,
  isSortAsc: PropTypes.bool,
  onCheckAllToggle: PropTypes.func,
  onSortChange: PropTypes.func,
};

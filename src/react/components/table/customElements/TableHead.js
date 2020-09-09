/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getCellLocation } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';
import { ns } from '../../helpers/xuiClassNamespace';
import TableHeadCheckBoxCell from './TableHeadCheckBoxCell';
import TableHeadOverflowMenuCell from './TableHeadOverflowMenuCell';
import TableHeadGenericCell from './TableHeadGenericCell';

class TableHead extends PureComponent {
  render = () => {
    const {
      data,
      columns,
      activeSortKey,
      isSortAsc,
      onSortChange,
      hasCheckbox,
      checkedIds,
      onCheckAllToggle,
      checkAllRowsLabel,
      hasOverflowMenu,
      ensureCellVisibility,
      sortbuttonIcon,
    } = this.props;

    return (
      <thead className={`${NAME_SPACE}--head`}>
        <tr className={`${NAME_SPACE}--row ${ns}-text-align-left`}>
          {hasCheckbox && (
            <TableHeadCheckBoxCell
              {...{
                totalData: data.length,
                checkedIds,
                onCheckAllToggle,
                checkAllRowsLabel,
              }}
            />
          )}

          {columns.map(
            (
              {
                props: {
                  head: {
                    props: { children, sortKey, className },
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
                  cellLocation: getCellLocation({
                    columns,
                    columnIndex,
                    hasCheckbox,
                    hasOverflowMenu,
                  }),
                  sortbuttonIcon,
                }}
              />
            ),
          )}

          {hasOverflowMenu && <TableHeadOverflowMenuCell />}
        </tr>
      </thead>
    );
  };
}

TableHead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.node.isRequired,
  ensureCellVisibility: PropTypes.func,

  // Checkbox.
  hasCheckbox: PropTypes.bool,
  checkedIds: PropTypes.array,
  onCheckAllToggle: PropTypes.func,
  checkAllRowsLabel: PropTypes.node,

  // Overflow Menu.
  hasOverflowMenu: PropTypes.bool,

  // Sorting
  activeSortKey: PropTypes.string,
  isSortAsc: PropTypes.bool,
  onSortChange: PropTypes.func,
  sortbuttonIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),
};

export default TableHead;

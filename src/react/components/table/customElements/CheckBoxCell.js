import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TableData from './TableData';
import XUICheckbox from '../../checkbox/XUICheckbox';

import { createCellLocationClasses, cellClassNames } from '../helpers/utilities';
import { NAME_SPACE, NBSP } from '../helpers/constants';

const BODY_CELL_CLASSES = `${cellClassNames.cell} ${cellClassNames.defaultLayout}`;

export default class CheckBoxCell extends PureComponent {
  handleChange = event => {
    const { onCheckOneToggle, rowId } = this.props;

    onCheckOneToggle(event, rowId);
  };

  render() {
    const { isChecked, isDisabled, checkOneRowAriaLabel, dividerClasses } = this.props;
    const className = cn(
      `${NAME_SPACE}--cell-action`,
      BODY_CELL_CLASSES,
      createCellLocationClasses('first'),
      dividerClasses,
    );

    return (
      <TableData className={className} tabIndex={-1}>
        {NBSP}
        <XUICheckbox
          className={`${NAME_SPACE}--checkbox-body`}
          isChecked={isChecked}
          isDisabled={isDisabled}
          isGrouped
          isLabelHidden
          onChange={this.handleChange}
          tabIndex={0}
        >
          {checkOneRowAriaLabel}
        </XUICheckbox>
      </TableData>
    );
  }
}

CheckBoxCell.propTypes = {
  rowId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onCheckOneToggle: PropTypes.func,
  checkOneRowAriaLabel: PropTypes.node,
  dividerClasses: PropTypes.string,
};

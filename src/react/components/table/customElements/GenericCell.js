import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { createCellLocationClasses, cellClassNames } from '../helpers/utilities';
import { NAME_SPACE } from '../helpers/constants';

import TableData from './TableData';

const BODY_CELL_CLASSES = `${cellClassNames.cell} ${cellClassNames.defaultLayout}`;

export default class GenericCell extends PureComponent {
  handleInteraction = event => {
    const { handleCellInteraction, onCellClick } = this.props;
    handleCellInteraction(event, onCellClick);
  };

  render() {
    const {
      className: suppliedClasses,
      isRowLink,
      dividerClasses,
      ensureCellVisibility,
      children,
      onCellClick,
      hasWrapping,
      cellLocation,
      qaHook,
    } = this.props;
    const isCellLink = !isRowLink && onCellClick;
    const role = isCellLink ? 'button' : undefined;
    const onClick = isCellLink ? this.handleInteraction : undefined;
    const onKeyDown = isCellLink ? this.handleInteraction : undefined;
    const className = cn(
      BODY_CELL_CLASSES,
      dividerClasses,
      createCellLocationClasses(cellLocation),
      suppliedClasses,
      {
        [`${NAME_SPACE}--cell-link`]: isCellLink,
        [`${NAME_SPACE}--cell-singleline`]: !hasWrapping,
      },
    );

    return (
      <TableData
        {...{
          className,
          onFocus: ensureCellVisibility,
          role,
          onClick,
          onKeyDown,
          tabIndex: isCellLink ? 0 : undefined,
          qaHook,
        }}
      >
        {children}
      </TableData>
    );
  }
}

GenericCell.propTypes = {
  cellLocation: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  columnIndex: PropTypes.number,
  dividerClasses: PropTypes.string,
  ensureCellVisibility: PropTypes.func,
  handleCellInteraction: PropTypes.func,
  hasWrapping: PropTypes.bool,
  isRowLink: PropTypes.bool,
  onCellClick: PropTypes.func,
  qaHook: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';

import { tableName } from './private/constants';
import XUIEditableTableCell from './XUIEditableTableCell';
import XUIIconButton from './../button/XUIIconButton';

const baseName = `${tableName}celliconbutton`;

const XUIEditableTableCellIconButton = ({
  cellProps = {},
  iconReference,
  onClick,
  qaHook,
  ariaLabel,
  ...spreadProps
}) => {
  return (
    <XUIEditableTableCell className={baseName} {...cellProps}>
      <XUIIconButton
        ariaLabel={ariaLabel}
        icon={iconReference}
        onClick={onClick}
        qaHook={qaHook}
        {...spreadProps}
      />
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellIconButton.propTypes = {
  cellProps: PropTypes.object,
  /** Required prop, an object describing the path, width and height. */
  iconReference: PropTypes.shape({
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  qaHook: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default XUIEditableTableCellIconButton;

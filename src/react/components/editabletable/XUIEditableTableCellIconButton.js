import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableVariantClassNames } from './private/constants';
import XUIEditableTableCell from './XUIEditableTableCell';
import XUIIconButton from '../button/XUIIconButton';

const baseName = `${tableVariantClassNames.editable}celliconbutton`;

const XUIEditableTableCellIconButton = ({
  ariaLabel,
  cellProps = {},
  iconReference,
  onClick,
  qaHook,
  ...spreadProps
}) => {
  return (
    <XUIEditableTableCell {...cellProps} className={cn(baseName, cellProps.className)}>
      <XUIIconButton
        {...spreadProps}
        ariaLabel={ariaLabel}
        icon={iconReference}
        onClick={onClick}
        qaHook={qaHook}
      />
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellIconButton.propTypes = {
  ariaLabel: PropTypes.string,
  cellProps: PropTypes.object,
  /** Required prop, an object describing the path, width and height. */
  iconReference: PropTypes.shape({
    height: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  qaHook: PropTypes.string,
};

export default XUIEditableTableCellIconButton;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { tableName } from './private/constants';
import EditableTableCellContext from '../../contexts/EditableTableCellContext';
import XUIEditableTableCell from './XUIEditableTableCell';

const baseName = `${tableName}cell`;

const XUIEditableTableCellControl = ({
  children,
  className,
  isDisabled,
  isFocused,
  isInvalid,
  validationMessage,
  ...spreadProps
}) => {
  const cellRef = React.useRef();
  const controlBaseName = `${baseName}-control`;
  return (
    <XUIEditableTableCell
      className={cn(
        className,
        controlBaseName,
        isDisabled && `${controlBaseName}-is-disabled`,
        isFocused && `${controlBaseName}-is-focused`,
        isInvalid && `${controlBaseName}-is-invalid`,
      )}
      ref={cellRef}
      {...spreadProps}
    >
      <EditableTableCellContext.Provider value={{ cellRef, useCellStyling: true }}>
        <div className={`${baseName}--focus-shadow`}>
          <div className={`${baseName}--border`}>
            {children}
            {isInvalid && validationMessage && (
              <div
                className={cn(
                  `${baseName}--validation`,
                  isInvalid && `${baseName}--validation-is-invalid`,
                )}
              >
                {validationMessage}
              </div>
            )}
          </div>
        </div>
      </EditableTableCellContext.Provider>
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellControl.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Used to style the cell as disabled.
   */
  isDisabled: PropTypes.bool,
  /**
   * Used to style the cell as focused.
   */
  isFocused: PropTypes.bool,
  /**
   * Used to style the cell as invalid.
   */
  isInvalid: PropTypes.bool,
  /**
   * Validation message to show under the input if `isInvalid` is true.
   */
  validationMessage: PropTypes.string,
};

export default XUIEditableTableCellControl;

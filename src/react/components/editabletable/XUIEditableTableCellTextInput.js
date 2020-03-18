import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUITextInput from '../textInput/XUITextInput';
import { tableName } from './private/constants';

const baseName = `${tableName}celltextinput`;

const XUIEditableTableCellTextInput = ({ cellProps, children, className, ...spreadProps }) => {
  return (
    <XUIEditableTableCell className={cn(baseName, className)} {...cellProps}>
      <XUITextInput {...spreadProps} containerClassName={`${baseName}--textinput`} />
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellTextInput.propTypes = {
  cellProps: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableCellTextInput;

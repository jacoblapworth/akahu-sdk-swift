import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUIEditableTableCell from './XUIEditableTableCell';
import XUITextInput from '../textInput/XUITextInput';
import { tableName } from './private/constants';

const baseName = `${tableName}celltextinput`;

const XUIEditableTableCellTextInput = ({ children, className, ...spreadProps }) => {
  return (
    <XUIEditableTableCell className={cn(baseName, className)} {...spreadProps}>
      <XUITextInput containerClassName={`${baseName}--textinput`} />
    </XUIEditableTableCell>
  );
};

XUIEditableTableCellTextInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIEditableTableCellTextInput;

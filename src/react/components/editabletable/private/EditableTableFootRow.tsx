import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import XUIEditableTableCell from '../XUIEditableTableCell';
import { xuiControlSizeStandard } from './constants';

interface BaseProps {
  qaHook?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLTableRowElement>;

const EditableTableFootRow: React.FunctionComponent<Props> = ({
  children,
  qaHook,
  ...spreadProps
}) => {
  const {
    rowOptions: { isDraggable, isRemovable },
  } = React.useContext(XUIEditableTableContext);

  return (
    <tr data-automationid={qaHook} {...spreadProps}>
      {isDraggable && <XUIEditableTableCell style={{ width: xuiControlSizeStandard }} />}
      {children}
      {isRemovable && <XUIEditableTableCell style={{ width: xuiControlSizeStandard }} />}
    </tr>
  );
};

EditableTableFootRow.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

export default EditableTableFootRow;

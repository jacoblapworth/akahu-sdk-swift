import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';
import { tableName, xuiControlSizeStandard } from './constants';

export const baseName = `${tableName}row`;

interface BaseProps {
  qaHook?: string;
}

type Props = BaseProps & React.HTMLAttributes<HTMLTableRowElement>;

const EditableTableHeadRow: React.FunctionComponent<Props> = ({
  children,
  qaHook,
  ...spreadProps
}) => {
  const {
    rowOptions: { isDraggable, isRemovable },
  } = React.useContext(XUIEditableTableContext);

  return (
    <tr data-automationid={qaHook} {...spreadProps}>
      {isDraggable && <XUIEditableTableHeadingCell style={{ width: xuiControlSizeStandard }} />}
      {children}
      {isRemovable && <XUIEditableTableHeadingCell style={{ width: xuiControlSizeStandard }} />}
    </tr>
  );
};

EditableTableHeadRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  qaHook: PropTypes.string,
};

export default EditableTableHeadRow;

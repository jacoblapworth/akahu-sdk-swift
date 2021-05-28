import * as PropTypes from 'prop-types';
import * as React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';
import { xuiControlSizeStandard } from './constants';

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
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

export default EditableTableHeadRow;

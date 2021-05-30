import * as React from 'react';

import { XUIEditableTableCellControl } from '../../editabletable';
import XUISelectBox from '../../selectbox';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUISelectBox>,
    | 'buttonVariant'
    | 'hasDefaultLayout'
    | 'fullWidth'
    | 'isFieldLayout'
    | 'isLabelHidden'
    | 'labelClassName'
    | 'size'
  >;

declare const XUIEditableTableCellSelectBox: React.FunctionComponent<Props>;
export default XUIEditableTableCellSelectBox;

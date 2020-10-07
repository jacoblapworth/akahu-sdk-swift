import * as React from 'react';

import { XUIEditableTableCellControl } from '../../editabletable';
import SelectBox from '../../select-box';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof SelectBox>,
    | 'buttonVariant'
    | 'defaultLayout'
    | 'fullWidth'
    | 'isFieldLayout'
    | 'isLabelHidden'
    | 'labelClassName'
    | 'size'
  >;

declare const XUIEditableTableCellSelectBox: React.FunctionComponent<Props>;
export default XUIEditableTableCellSelectBox;

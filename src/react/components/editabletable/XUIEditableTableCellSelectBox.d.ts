import * as React from 'react';

import SelectBox from '../../select-box';

interface BaseProps {
  cellProps?: object;
}

type Props = BaseProps &
  Omit<
    SelectBox,
    'defaultLayout' | 'fullWidth' | 'isFieldLayout' | 'isLabelHidden' | 'labelClassName' | 'size'
  > &
  React.HTMLAttributes<HTMLDivElement>;

declare const XUIEditableTableCellSelectBox: React.FunctionComponent<Props>;
export default XUIEditableTableCellSelectBox;

import * as React from 'react';

import SelectBox from '../../select-box';

interface BaseProps {
  cellProps?: object;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof SelectBox>,
    'defaultLayout' | 'fullWidth' | 'isFieldLayout' | 'isLabelHidden' | 'labelClassName' | 'size'
  >;

declare const XUIEditableTableCellSelectBox: React.FunctionComponent<Props>;
export default XUIEditableTableCellSelectBox;

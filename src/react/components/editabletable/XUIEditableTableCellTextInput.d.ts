import * as React from 'react';

import { XUIEditableTableCellControl } from '../../editabletable';
import XUITextInput from '../textInput/XUITextInput';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
  className?: string;
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUITextInput>,
    | 'defaultValue'
    | 'fieldClassName'
    | 'focusByDefault'
    | 'hintMessage'
    | 'isBorderlessSolid'
    | 'isBorderlessTransparent'
    | 'isFieldLayout'
    | 'isInverted'
    | 'isLabelHidden'
    | 'isManuallyResizable'
    | 'labelClassName'
    | 'size'
  >;

declare const XUIEditableTableCellTextInput: React.FunctionComponent<Props>;
export default XUIEditableTableCellTextInput;

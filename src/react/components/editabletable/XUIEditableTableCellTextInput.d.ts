import * as React from 'react';

import XUITextInput, { XUITextInputHTMLAttributes } from '../textInput/XUITextInput';

interface BaseProps {
  cellProps?: object;
  className?: string;
}

type Props = BaseProps &
  Omit<
    XUITextInput,
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
  > &
  XUITextInputHTMLAttributes;

declare const XUIEditableTableCellTextInput: React.FunctionComponent<Props>;
export default XUIEditableTableCellTextInput;

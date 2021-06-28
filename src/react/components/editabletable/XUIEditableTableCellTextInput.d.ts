import * as React from 'react';

import { XUIEditableTableCellControl } from '../../editabletable';
import XUITextInput from '../textinput/XUITextInput';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
  className?: string;
  /**
   * Aligns the content of the cell on the inline (horizontal) axis.
   */
  inlineAlignment?: 'end' | 'start';
}

type Props = BaseProps &
  Omit<
    React.ComponentProps<typeof XUITextInput>,
    | 'fieldClassName'
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

import * as React from 'react';

import XUIAutocompleter from '../../autocompleter';
import { XUIEditableTableCellControl } from '../../editabletable';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
}

type Props = BaseProps &
  Omit<React.ComponentProps<typeof XUIAutocompleter>, 'hintMessage' | 'isInputLabelHidden'>;

declare const XUIEditableTableCellAutocompleter: React.Component<Props>;
export default XUIEditableTableCellAutocompleter;

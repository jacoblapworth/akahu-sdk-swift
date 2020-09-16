import * as React from 'react';

import XUIAutocompleter from '../../autocompleter';

interface BaseProps {
  cellProps?: object;
}

type Props = BaseProps &
  Omit<React.ComponentProps<typeof XUIAutocompleter>, 'hintMessage' | 'isInputLabelHidden'>;

declare const XUIEditableTableCellAutocompleter: React.Component<Props>;
export default XUIEditableTableCellAutocompleter;

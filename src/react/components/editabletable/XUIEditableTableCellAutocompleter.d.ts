import * as React from 'react';

import XUIAutocompleter from '../../autocompleter';

interface BaseProps {
  cellProps?: object;
}

type Props = BaseProps &
  Omit<XUIAutocompleter, 'hintMessage' | 'isinputLabelHidden'> &
  React.HTMLAttributes<HTMLDivElement>;

declare const XUIEditableTableCellAutocompleter: React.Component<Props>;
export default XUIEditableTableCellAutocompleter;

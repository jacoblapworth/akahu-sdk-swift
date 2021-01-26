import * as React from 'react';

import XUIAutocompleter from '../../autocompleter';
import { XUIEditableTableCellControl } from '../../editabletable';

interface BaseProps {
  cellProps?: React.ComponentProps<typeof XUIEditableTableCellControl>;
}

type Props = BaseProps &
  Omit<React.ComponentProps<typeof XUIAutocompleter>, 'hintMessage' | 'isInputLabelHidden'>;

export default class XUIEditableTableCellAutocompleter extends React.Component<Props> {
  /**
   * Set the state as hidden in order to toggle the list closed.
   */
  closeDropdown: () => void;

  /**
   * Focus the input inside the cell.
   */
  focusInput: () => void;

  /**
   * Set the state as not hidden in order to toggle the list open.
   */
  openDropdown: () => void;
}

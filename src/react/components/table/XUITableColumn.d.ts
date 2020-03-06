import React from 'react';

import { EnrichedTableItemObject } from './XUITable';
import { Props as XUITableCellProps } from './XUITableCell';

export interface XUITableColumnProps {
  /**
   * A function that passes in the current rows data and expects a Cell back.
   */
  body: (rowData: EnrichedTableItemObject) => React.ReactElement<XUITableCellProps>;
  /**
   * The head Cell for the Column.
   */
  head?: React.ReactElement<XUITableCellProps>;
}

export default class XUITableColumn extends React.PureComponent<XUITableColumnProps> {}

import * as React from 'react';

import { EnrichedTableItemObject } from './XUITable';
import XUITableCell from './XUITableCell';

export interface XUITableColumnProps {
  /**
   * A function that passes in the current rows data and expects a Cell back.
   */
  body: (
    rowData: EnrichedTableItemObject,
  ) => React.ReactElement<React.ComponentProps<typeof XUITableCell>>;
  /**
   * The head Cell for the Column.
   */
  head?: React.ReactElement<React.ComponentProps<typeof XUITableCell>>;
}

export default class XUITableColumn extends React.PureComponent<XUITableColumnProps> {}

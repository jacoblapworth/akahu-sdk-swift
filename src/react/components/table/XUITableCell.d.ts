import * as React from 'react';

import { CreateInteractionHandler } from './XUITable';

export interface Props {
  /**
   * Attached CSS classes on a per Cell basis.
   */
  className?: string;
  /**
   * Allow a cells data to wrap and create multiple lines.
   */
  hasWrapping?: boolean;
  /**
   * A function that conditionally adds a callback for cells that need an interaction.
   */
  onCellClick?: CreateInteractionHandler;
  qaHook?: string;
  /**
   * Reference to an object key in the supplied data that the relating column should sort by.
   */
  sortKey?: string;
}

export default class XUITableCell extends React.PureComponent<Props> {}

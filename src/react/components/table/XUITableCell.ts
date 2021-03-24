import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RowData } from './XUITable';

interface Props<RD extends RowData> {
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
  onCellClick?: (rowData: RD) => void;
  qaHook?: string;
  /**
   * Reference to an object key in the supplied data that the relating column should sort by.
   */
  sortKey?: string;
}

class XUITableCell<RD extends RowData> extends React.PureComponent<Props<RD>> {
  /**
   * This component does not render anything. It is purely a way to capture and validate the user
   * facing props for the table "Cell".
   *
   * The way this component is used is by taking the supplied props from this component and
   * enriching them into a more advanced private component with functionality outside of the users
   * scope.
   */
  render = () => null;

  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    className: PropTypes.string,
    hasWrapping: PropTypes.bool,
    onCellClick: PropTypes.func,
    qaHook: PropTypes.string,
    sortKey: PropTypes.string,
  };
  /* eslint-enable react/no-unused-prop-types */
}

export default XUITableCell;

import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RowData } from './XUITable';

interface Props<RD extends RowData> {
  /**
   * A function that passes in the current rows data and expects a Cell back.
   */
  body: (rowData: RD) => React.ReactNode;
  /**
   * The head Cell for the Column. Either all of the Columns have to have it or none of them.
   */
  head?: React.ReactNode;
  /**
   * Aligns the content of the cell on the inline (horizontal) axis.
   */
  inlineAlignment?: 'end' | 'start';
}

class XUITableColumn<RD extends RowData> extends React.PureComponent<Props<RD>> {
  /**
   * This component does not render anything. It is purely a way to capture and validate the user
   * facing props for the table "Column".
   *
   * "Columns" are not really a thing in HTML tables (they are more "Row" / "Cell" orientated)
   * however they are easy to rationalise when composing the table scaffold.
   *
   * By using this "Column" component abstraction we can take the supplied "head" and "body" props
   * from this component and map their "Cell" content into their respective <tr /> elements as part
   * of the table render sequence.
   */

  render = () => null;

  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    body: PropTypes.func.isRequired,
    head: PropTypes.node,
    inlineAlignment: PropTypes.oneOf(['end', 'start']),
  };
  /* eslint-enable react/no-unused-prop-types */
}

export default XUITableColumn;

import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class XUITableCell extends PureComponent {
  // This component does not render anything. It is purely a way to capture and
  // validate the user facing props for the table "Cell".

  // The way this component is used is by taking the supplied props from
  // this component and enriching them into a more advanced private component
  // with functionality outside of the users scope.
  render = () => null;
}

/* eslint-disable react/no-unused-prop-types */
XUITableCell.propTypes = {
  /** Attached CSS classes on a per Cell basis. */
  className: PropTypes.string,

  /** Allow a cells data to wrap and create multiple lines. */
  hasWrapping: PropTypes.bool,

  /** A function that conditionally adds a callback for cells that need an interaction. */
  onCellClick: PropTypes.func,

  qaHook: PropTypes.string,

  /** Reference to an object key in the supplied data that the relating column should sort by. */
  sortKey: PropTypes.string,
};
/* eslint-enable react/no-unused-prop-types */

export default XUITableCell;

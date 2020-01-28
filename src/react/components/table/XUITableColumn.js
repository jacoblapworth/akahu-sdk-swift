import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class XUITableColumn extends PureComponent {
  // This component does not render anything. It is purely a way to capture and
  // validate the user facing props for the table "Column".

  // "Columns" are not really a thing in HTML tables (they are more "Row" / "Cell"
  // orientated) however they are easy to rationalise when composing the table
  // scaffold.

  // By using this "Column" component abstraction we can take the supplied "head"
  // and "body" props from this component and map their "Cell" content into their
  // respective <tr /> elements as part of the table render sequence.
  render = () => null;
}

/* eslint-disable react/no-unused-prop-types */
XUITableColumn.propTypes = {
  /** The head Cell for the Column. */
  head: PropTypes.node.isRequired,

  /** A function that passes in the current rows data and expects a Cell back. */
  body: PropTypes.func.isRequired,
};
/* eslint-enable react/no-unused-prop-types */

export default XUITableColumn;

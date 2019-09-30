import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { picklistClassName } from './private/constants';

/**
 * Presentational component used to display a dividing line in a
 * list of items.
 *
 * @export
 * @class PicklistDivider
 * @extends {PureComponent}
 */
export default class PicklistDivider extends PureComponent {
  render() {
    const { className } = this.props;

    const classes = cn(`${picklistClassName}--divider`, className);

    return <li className={classes} />;
  }
}

PicklistDivider.propTypes = {
  className: PropTypes.string,
};

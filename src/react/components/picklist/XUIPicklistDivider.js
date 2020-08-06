import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { picklistClassName } from './private/constants';

/**
 * Presentational component used to display a dividing line in a
 * list of items.
 *
 * @export
 */
const XUIPicklistDivider = ({ className }) => {
  const classes = cn(`${picklistClassName}--divider`, className);

  return <li className={classes} />;
};

export default XUIPicklistDivider;

XUIPicklistDivider.propTypes = {
  className: PropTypes.string,
};
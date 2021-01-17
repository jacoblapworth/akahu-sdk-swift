import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { picklistClassName } from './private/constants';

/**
 * Presentational component used to display a non-selectable header in a
 * list of items.
 *
 * @export
 */
const XUIPicklistHeader = ({ ariaRole, children, className, id }) => {
  const classes = cn(`${picklistClassName}--header`, className);

  return (
    <li className={classes} id={id} role={ariaRole}>
      <span className={`${picklistClassName}--header--text`}>{children}</span>
    </li>
  );
};

export default XUIPicklistHeader;

XUIPicklistHeader.propTypes = {
  /** ARIA attribute defining what purpose this item serves. */
  ariaRole: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

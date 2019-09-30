import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUIIsolationHeader extends PureComponent {
  render() {
    const { qaHook, className, isPositionFixed, role, tagName, children } = this.props;

    const classNames = cn(
      className,
      `${ns}-isolationheader`,
      isPositionFixed && `${ns}-isolationheader-fixed`,
    );

    const Tag = tagName;

    return (
      <Tag className={classNames} data-automationid={qaHook} role={role}>
        {children}
      </Tag>
    );
  }
}

XUIIsolationHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** The role attribute that should be applied. Defaults to 'banner' */
  role: PropTypes.string,

  /** The element tag to use. Defaults to 'header' */
  tagName: PropTypes.string,

  /** Applies fixed positioning so the isolation mode header scrolls with the page */
  isPositionFixed: PropTypes.bool,
};

XUIIsolationHeader.defaultProps = {
  role: 'banner',
  tagName: 'header',
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { observe, unobserve, getWidthClasses } from '../helpers/resizeObserver';

export default class XUIGridAreaHeader extends PureComponent {
  _area = React.createRef();

  componentDidMount() {
    this._area.current && observe(this);
  }

  componentWillUnmount() {
    this._area.current && unobserve(this);
  }

  render() {
    const { children, ...otherProps } = this.props;

    const classNames = cn(`${ns}-gridarea-header`, ...getWidthClasses(this.state));

    return (
      <div className={classNames} ref={this._area} {...otherProps}>
        {children}
      </div>
    );
  }
}

XUIGridAreaHeader.propTypes = {
  children: PropTypes.any,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class DropDownFooter extends PureComponent {
  render(){
    const footer = this;
    const { children, className } = footer.props;

    const classes = cn('xui-dropdown--footer', className);

    return (
      <div className={classes} ref={f => footer.rootNode = f}>{children}</div>
    )
  }
}

DropDownFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

/**
 * Wrapper component for contents of a dropdown footer.  DropDown does expect this to be the
 * wrapper, so it's use is mandatory.
 *
 * @export
 * @class DropDownFooter
 * @extends {PureComponent}
 */
export default class DropDownFooter extends PureComponent {
  render() {
    const footer = this;
    const { children, className, qaHook } = footer.props;

    const classes = cn('xui-dropdown--footer', className);

    return (
      <div className={classes} ref={f => footer.rootNode = f} data-automationid={qaHook}>{children}</div>
    )
  }
}

DropDownFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string
};

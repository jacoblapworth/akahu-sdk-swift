import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-contentblock`;

export default class XUIContentBlock extends PureComponent {
  render() {
    const { qaHook, className, children } = this.props;
    const listClasses = cn(className, baseClass);

    return (
      <div className={listClasses} data-automationid={qaHook}>
        {children}
      </div>
    );
  }
}

XUIContentBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

XUIContentBlock.defaultProps = {};

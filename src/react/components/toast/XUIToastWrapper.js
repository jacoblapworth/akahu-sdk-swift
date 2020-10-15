import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import portalContainer from '../helpers/portalContainer';
import { ns } from '../helpers/xuiClassNamespace';
import { baseClass } from './private/constants';

const XUIToastWrapper = ({ children, className, qaHook }) => {
  const classNames = cn(className, `${baseClass}wrapper`);
  const isOpened = React.Children.count(children) > 0;

  return isOpened ? (
    <Portal node={portalContainer()}>
      <div className={cn(classNames, `${ns}-container`)} data-automationid={qaHook}>
        {children}
      </div>
    </Portal>
  ) : null;
};

export default XUIToastWrapper;

XUIToastWrapper.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,
  children: PropTypes.node,
};

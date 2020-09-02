import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerMessage(props) {
  const { className: propsClassName, qaHook, children } = props;

  const className = cn(propsClassName, `${ns}-banner--message`);

  return (
    <p className={className} data-automationid={qaHook}>
      {children}
    </p>
  );
}

XUIBannerMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

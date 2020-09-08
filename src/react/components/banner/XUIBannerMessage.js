import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerMessage(props) {
  const className = cn(props.className, `${ns}-banner--message`);

  return (
    <p className={className} data-automationid={props.qaHook}>
      {props.children}
    </p>
  );
}

XUIBannerMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  qaHook: PropTypes.string,
};

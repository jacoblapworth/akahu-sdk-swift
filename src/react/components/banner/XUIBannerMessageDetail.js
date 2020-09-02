import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerMessageDetail(props) {
  const { className: propsClassName, qaHook, messageDetails } = props;
  const className = cn(propsClassName, `${ns}-banner--messagedetail`);

  return (
    <ul className={className} data-automationid={qaHook}>
      {messageDetails.map(listText => (
        <li key={listText}>{listText}</li>
      ))}
    </ul>
  );
}

XUIBannerMessageDetail.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** The banner message details to be displayed as a list */
  messageDetails: PropTypes.arrayOf(PropTypes.node).isRequired,
};

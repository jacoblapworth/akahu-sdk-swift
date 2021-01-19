import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const XUIBannerMessageDetail = ({ className, messageDetails, qaHook }) => {
  const messageDetailClassName = cn(className, `${ns}-banner--messagedetail`);

  return (
    <ul className={messageDetailClassName} data-automationid={qaHook}>
      {messageDetails.map(listText => (
        <li key={listText}>{listText}</li>
      ))}
    </ul>
  );
};

export default XUIBannerMessageDetail;

XUIBannerMessageDetail.propTypes = {
  className: PropTypes.string,
  /** The banner message details to be displayed as a list */
  messageDetails: PropTypes.arrayOf(PropTypes.node).isRequired,
  qaHook: PropTypes.string,
};

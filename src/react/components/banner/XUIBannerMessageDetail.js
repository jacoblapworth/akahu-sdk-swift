import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

export default function XUIBannerMessageDetail(props) {
  const className = cn(props.className, `${ns}-banner--messagedetail`);

  return (
    <ul className={className} data-automationid={props.qaHook}>
      {props.messageDetails.map(listText => (
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

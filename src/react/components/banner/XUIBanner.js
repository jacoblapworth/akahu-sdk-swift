import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import crossIcon from '@xero/xui-icon/icons/cross';
import XUIIconButton from '../button/XUIIconButton';
import sentimentMap from './private/sentiments';
import { ns } from '../helpers/xuiClassNamespace';

const sentiments = Object.keys(sentimentMap);

const XUIBanner = ({
  children,
  className,
  defaultLayout,
  onCloseClick,
  qaHook,
  role,
  sentiment,
}) => {
  const closeButton = onCloseClick && (
    <XUIIconButton
      ariaLabel="Close"
      className={`${ns}-banner--close`}
      icon={crossIcon}
      onClick={onCloseClick}
      qaHook={qaHook && `${qaHook}-close--button`}
      size="small"
      title="Close"
    />
  );

  const sentimentData = sentimentMap[sentiment];
  const sentimentClass = sentimentData && sentimentData.class;
  const bannerRole = role || (sentimentData && sentimentData.role) || 'status';

  const classes = cn(
    className,
    `${ns}-banner`,
    {
      [`${ns}-banner-layout`]: defaultLayout,
    },
    sentimentClass,
  );

  return (
    <div className={classes} data-automationid={qaHook} role={bannerRole}>
      {closeButton}
      {children}
    </div>
  );
};

export default XUIBanner;

XUIBanner.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,
  children: PropTypes.node,

  /** Alters the banner to show positive or negative sentiment */
  sentiment: PropTypes.oneOf(sentiments),

  /** Handles the click event for the action */
  onCloseClick: PropTypes.func,

  /** Defines whether the default layout class should be supplied */
  defaultLayout: PropTypes.bool,

  /** Applies a role attribute to the toast element. This will override any
   * component-determined value. */
  role: PropTypes.string,
};

XUIBanner.defaultProps = {
  defaultLayout: true,
};

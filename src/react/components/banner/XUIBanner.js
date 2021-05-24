import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import crossIcon from '@xero/xui-icon/icons/cross';
import XUIIconButton from '../button/XUIIconButton';
import sentimentMap from './private/sentiments';
import { ns } from '../helpers/xuiClassNamespace';
import checkRequiredProps from '../../helpers/checkRequiredProps';

const sentiments = Object.keys(sentimentMap);

const XUIBanner = ({
  children,
  className,
  closeButtonLabel,
  hasDefaultLayout,
  onCloseClick,
  qaHook,
  role,
  sentiment,
}) => {
  const closeButton = onCloseClick && (
    <XUIIconButton
      ariaLabel={closeButtonLabel}
      className={`${ns}-banner--close`}
      icon={crossIcon}
      onClick={onCloseClick}
      qaHook={qaHook && `${qaHook}-close--button`}
      size="small"
      title={closeButtonLabel}
    />
  );

  const sentimentData = sentimentMap[sentiment];
  const sentimentClass = sentimentData && sentimentData.class;
  const bannerRole = role || (sentimentData && sentimentData.role) || 'status';

  const classes = cn(
    className,
    `${ns}-banner`,
    {
      [`${ns}-banner-layout`]: hasDefaultLayout,
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
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Title and accessibility label to be applied to the banner close "X" button.
   * This is required if an `onCloseClick` callback prop is provided.
   * <br />
   * Recommended English value: *Close*
   */
  closeButtonLabel(...parameters) {
    return checkRequiredProps('onCloseClick', PropTypes.string.isRequired, ...parameters);
  },
  /** Defines whether the default layout class should be supplied */
  hasDefaultLayout: PropTypes.bool,
  /** Handles the click event for the action */
  onCloseClick: PropTypes.func,
  qaHook: PropTypes.string,
  /** Applies a role attribute to the banner element. This will override any
   * component-determined value. */
  role: PropTypes.string,
  /** Alters the banner to show positive or negative sentiment */
  sentiment: PropTypes.oneOf(sentiments),
};

XUIBanner.defaultProps = {
  hasDefaultLayout: true,
};

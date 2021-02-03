import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import cross from '@xero/xui-icon/icons/cross';
import XUIIconButton from '../button/XUIIconButton';
import { sentimentMap, baseClass } from './private/constants';
import XUIToastActions from './XUIToastActions';
import XUIToastMessage from './XUIToastMessage';
import shouldRender from '../helpers/shouldRender';

const sentiments = Object.keys(sentimentMap);

const XUIToast = ({
  actions,
  children,
  className,
  defaultLayout,
  isHidden,
  message,
  onCloseClick,
  onMouseLeave,
  onMouseOver,
  primaryAction,
  qaHook,
  role,
  secondaryAction,
  sentiment,
}) => {
  const sentimentData = sentimentMap[sentiment];
  const sentimentClass = sentimentData && sentimentData.class;
  const a11yRole = role || (sentimentData && sentimentData.role) || 'status';
  const buttonQAHook = qaHook && `${qaHook}-close-button`;
  const displayMessage = shouldRender(message) && <XUIToastMessage>{message}</XUIToastMessage>;

  const displayActions =
    actions && actions.length > 0 ? <XUIToastActions>{actions}</XUIToastActions> : null;

  const actionsNewAPI =
    primaryAction != null ? (
      <XUIToastActions primaryAction={primaryAction} secondaryAction={secondaryAction}>
        {actions}
      </XUIToastActions>
    ) : null;

  const classNames = cn(
    baseClass,
    isHidden && `${baseClass}-is-hidden`,
    defaultLayout && `${baseClass}-layout`,
    sentimentClass,
    className,
  );

  const close = onCloseClick ? (
    <XUIIconButton
      ariaLabel="Close"
      className={`${baseClass}--close`}
      icon={cross}
      onClick={onCloseClick}
      qaHook={buttonQAHook}
      title="Close"
    />
  ) : null;

  return (
    <div
      aria-hidden={isHidden}
      className={classNames}
      data-automationid={qaHook}
      onBlur={onMouseLeave}
      onFocus={onMouseOver}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      role={a11yRole}
    >
      {close}
      {displayMessage}
      {children}
      {displayActions}
      {actionsNewAPI}
    </div>
  );
};

export default XUIToast;

XUIToast.propTypes = {
  /** Custom Actions */
  actions: PropTypes.arrayOf(PropTypes.node),
  /** Facility to pass in custom children */
  children: PropTypes.node,
  /** Adds optional class to wrapping component */
  className: PropTypes.string,
  /** Applies default layout class to the component */
  defaultLayout: PropTypes.bool,
  /** Hides the component when set to true */
  isHidden: PropTypes.bool,
  /** Custom toast message */
  message: PropTypes.node,
  /** When defined, displays the close button */
  onCloseClick: PropTypes.func,
  /** Handles the event for when the mouse moves out of the toast */
  onMouseLeave: PropTypes.func,
  /** Handles the event for when the mouse hovers over the toast */
  onMouseOver: PropTypes.func,
  /** First and primary action. Always use this one first before using
   * `secondaryAction` */
  primaryAction: PropTypes.node,
  /** Adds QA hook to wrapping component */
  qaHook: PropTypes.string,
  /** Applies a role attribute to the toast element.
   * This will override any component-determined value.
   * Set to `status` by default
   * When given a sentiment, will automatically apply an appropriate role */
  role: PropTypes.string,
  /** Secondary action */
  secondaryAction: (props, propName) =>
    !props.primaryAction && props[propName] != null
      ? new Error(`${propName} only gets rendered when you supply a primaryAction`)
      : null,
  /** The sentiment of the toast (positive or negative) */
  sentiment: PropTypes.oneOf(sentiments),
};

XUIToast.defaultProps = {
  defaultLayout: true,
  isHidden: false,
};

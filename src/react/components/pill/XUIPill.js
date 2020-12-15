import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';

import XUIIconButton from '../button/XUIIconButton';
import XUIInnerPill from './XUIInnerPill';
import XUITooltip from '../tooltip/XUITooltip';
import { baseClass, sizeClasses } from './private/constants';
import SizeContext from '../../contexts/SizeContext';
import DisabledStateContext from '../../contexts/DisabledStateContext';

function shouldShowTooltip(domElement) {
  return domElement && domElement.clientWidth < domElement.scrollWidth;
}

const XUIPill = ({
  avatar,
  avatarProps,
  className,
  debugShowToolTip,
  deleteButtonLabel,
  href,
  isInvalid,
  isLimitedWidth,
  onClick,
  onDeleteClick,
  qaHook,
  secondaryText,
  target,
  title,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasTooltip, setHasTooltip] = useState(false);

  const _innerPill = useRef();
  const _tooltip = useRef();

  useEffect(() => {
    const innerPillElement = _innerPill.current;
    const shouldHaveToolTip = hasTooltip === false && shouldShowTooltip(innerPillElement);

    if (shouldHaveToolTip) {
      setHasTooltip(true);
    }
  }, [hasTooltip]);

  useEffect(() => {
    const tooltip = _tooltip.current;

    if (isFocused && hasTooltip) {
      tooltip && tooltip.openTooltip();
    } else if (hasTooltip && !debugShowToolTip) {
      tooltip && tooltip.closeTooltip();
    }
  }, [hasTooltip, isFocused, debugShowToolTip]);

  const toggleFocus = () => {
    setIsFocused(prevState => !prevState.isFocused);
  };

  const hoverHandler = () => {
    if (hasTooltip) {
      _tooltip.current.openTooltip();
    }
  };

  const blurHandler = () => {
    if (hasTooltip) {
      _tooltip.current.closeTooltip();
    }
  };

  return (
    <DisabledStateContext.Consumer>
      {disabledStateProp => (
        <SizeContext.Consumer>
          {inheritedSize => {
            const defaultSize = 'medium';
            const size = props.size || inheritedSize || defaultSize;
            const hasAvatar = avatar || avatarProps || isInvalid;

            const pillClasses = cn(
              className,
              baseClass,
              isLimitedWidth && `${baseClass}-maxwidth`,
              size && sizeClasses[size],
              isInvalid && `${baseClass}-is-invalid`,
              isFocused && `${baseClass}-is-focused`,
              onDeleteClick && `${baseClass}-is-deletable`,
              hasAvatar && `${baseClass}-has-avatar`,
              (href || onClick) && `${baseClass}-interactive`,
            );

            const deleteButton = onDeleteClick && (
              <XUIIconButton
                ariaLabel={deleteButtonLabel}
                className={`${baseClass}--button-icon`}
                icon={crossSmall}
                isDisabled={disabledStateProp?.isDisabled}
                isInverted={isInvalid}
                onClick={onDeleteClick}
                qaHook={qaHook && `${qaHook}--delete`}
                size={size}
                title={deleteButtonLabel}
              />
            );

            const content = (
              <div
                className={pillClasses}
                data-automationid={qaHook}
                onBlur={toggleFocus}
                onFocus={toggleFocus}
                onMouseEnter={hoverHandler}
                onMouseLeave={blurHandler}
              >
                <XUIInnerPill
                  innerPillRef={_innerPill}
                  {...{
                    avatarProps,
                    avatar,
                    href,
                    isInvalid,
                    onClick,
                    qaHook,
                    secondaryText,
                    target,
                    title,
                    value,
                    size,
                  }}
                />
                {deleteButton}
              </div>
            );

            if (hasTooltip || debugShowToolTip) {
              return (
                <XUITooltip
                  id={debugShowToolTip && 'tooltipDebugId'}
                  isHidden={!debugShowToolTip}
                  ref={_tooltip}
                  // Extra wrapping div required because tooltip has CSS that stomps on first child
                  trigger={<div className={`${baseClass}-parentmaxwidth`}>{content}</div>}
                  useInlineFlex
                >
                  {secondaryText}
                  {secondaryText && value ? <br /> : null}
                  {value}
                </XUITooltip>
              );
            }

            return content;
          }}
        </SizeContext.Consumer>
      )}
    </DisabledStateContext.Consumer>
  );
};

export default XUIPill;

XUIPill.propTypes = {
  /** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
  avatarProps: PropTypes.object,
  /** An avatar component. May be used instead of avatarProps */
  avatar(props, propName) {
    if (props[propName] && props.avatarProps) {
      return new Error('Cannot accept both avatarProps and an avatar component');
    }
    return null;
  },
  /** Apply classes to the outer Pill `div` element. */
  className: PropTypes.string,
  /**
   * Specify a label attribute for the delete button.
   * <br />
   * Recommended English value: *Delete*
   */
  deleteButtonLabel(props, propName) {
    if (props.onDeleteClick && typeof props[propName] !== 'string') {
      return new Error(
        'XUIPill: The prop `deleteButtonLabel` is required when using `onDeleteClick`.',
      );
    }

    return null;
  },
  /** This will make the value an `anchor` element instead of a `span` element and adds the
   * href as the link. */
  href: PropTypes.string,
  /** When invalid, displays the text in a red colour. */
  isInvalid: PropTypes.bool,
  /** Callback to fire when the main pill content is clicked. */
  onClick: PropTypes.func,
  /** Callback to fire when the delete pill button is clicked. When omitted, the delete button is also omitted from the view. If this is provided, you must also provide a `deleteButtonLabel` for accessibility. */
  onDeleteClick: PropTypes.func,
  /** add a qahook to the component */
  qaHook: PropTypes.string,
  /** When an `href` is supplied, adds a target attribute, else is ignored. */
  target: PropTypes.string,
  /** The title attribute to apply on the pill. */
  title: PropTypes.string,
  /** Adds a muted secondary text for the pill, appears before the main value. */
  secondaryText: PropTypes.node,
  /** The text to display inside the pill. */
  value: PropTypes.node,
  /** Whether the pill should have a max-width of 200px */
  isLimitedWidth: PropTypes.bool,
  /** The size of the pill to render. Can be `medium` or `small`. */
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
  debugShowToolTip: PropTypes.bool,
};

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import crossSmall from '@xero/xui-icon/icons/cross-small';
import XUIIconButton from '../button/XUIIconButton';
import XUIInnerPill from './XUIInnerPill';
import XUITooltip from '../tooltip/XUITooltip';
import { baseClass, sizeClasses, textTruncationClasses } from './private/constants';
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
  isSecondaryTextTruncated,
  isValueTruncated,
  hasLimitedWidth,
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

  const _value = useRef();
  const _secondaryText = useRef();
  const _tooltip = useRef();

  useEffect(() => {
    const shouldHaveToolTip =
      hasTooltip === false &&
      (shouldShowTooltip(_secondaryText?.current) || shouldShowTooltip(_value?.current));

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
    setIsFocused(prevState => !prevState);
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
              hasLimitedWidth && `${baseClass}-maxwidth`,
              size && sizeClasses[size],
              isInvalid && `${baseClass}-is-invalid`,
              isFocused && `${baseClass}-is-focused`,
              onDeleteClick && `${baseClass}-is-deletable`,
              hasAvatar && `${baseClass}-has-avatar`,
              (href || onClick) && `${baseClass}-interactive`,
              isValueTruncated && textTruncationClasses.value,
              isSecondaryTextTruncated && textTruncationClasses.secondaryText,
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
                  secondaryTextRef={_secondaryText}
                  valueRef={_value}
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

XUIPill.propTypes = {
  /** An avatar component. May be used instead of avatarProps */
  avatar(props, propName) {
    if (props[propName] && props.avatarProps) {
      return new Error('Cannot accept both avatarProps and an avatar component');
    }
    return null;
  },
  /** Props for the avatar to be displayed, must adhere to the XUIAvatar component API described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing props will omit the avatar entirely. */
  avatarProps: PropTypes.object,
  /** Apply classes to the outer Pill `div` element. */
  className: PropTypes.string,
  /**
   * @ignore
   * Dev / debug prop to show the tooltip initially on mount instead of based on a user event */
  debugShowToolTip: PropTypes.bool,
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
  /** Whether the pill should have a max-width of 200px */
  hasLimitedWidth: PropTypes.bool,
  /** This will make the value an `anchor` element instead of a `span` element and adds the
   * href as the link. */
  href: PropTypes.string,
  /** When invalid, displays the text in a red colour. */
  isInvalid: PropTypes.bool,
  /** Used to control whether the secondary text (`secondaryText`) has truncation priority. Defaults to `true`, along with `isValueTruncated` such that the default behaviour is that both pieces of text are truncated. */
  isSecondaryTextTruncated: PropTypes.bool,
  /** Used to control whether the primary text (`value`) has truncation priority. Defaults to `true`, along with `isSecondaryTextTruncated` such that the default behaviour is that both pieces of text are truncated. */
  isValueTruncated: PropTypes.bool,
  /** Callback to fire when the main pill content is clicked. */
  onClick: PropTypes.func,
  /** Callback to fire when the delete pill button is clicked. When omitted, the delete button is also omitted from the view. If this is provided, you must also provide a `deleteButtonLabel` for accessibility. */
  onDeleteClick: PropTypes.func,
  /** add a qahook to the component */
  qaHook: PropTypes.string,
  /** Adds a muted secondary text for the pill, appears before the main value. */
  secondaryText: PropTypes.node,
  /** The size of the pill to render. Can be `medium` or `small`. */
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  /** When an `href` is supplied, adds a target attribute, else is ignored. */
  target: PropTypes.string,
  /** The title attribute to apply on the pill. */
  title: PropTypes.string,
  /** The text to display inside the pill. */
  value: PropTypes.node,
};

XUIPill.defaultProps = {
  isSecondaryTextTruncated: true,
  isValueTruncated: true,
};

export default XUIPill;

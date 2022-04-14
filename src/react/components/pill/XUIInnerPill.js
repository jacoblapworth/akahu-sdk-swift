import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import LeftVisualEl from './private/LeftVisualEl';
import { ns } from '../helpers/xuiClassNamespace';
import { baseClass, childSizeClassMap } from './private/constants';

const XUIInnerPill = ({
  avatar,
  avatarProps,
  href,
  valueRef,
  secondaryTextRef,
  isInvalid,
  onClick,
  qaHook,
  secondaryText,
  size,
  target,
  title,
  value,
}) => {
  const isInteractive = href || onClick;

  const className = cn(`${baseClass}--content`, isInteractive && `${baseClass}--button`);
  const innerPillQaHook = qaHook && `${qaHook}--inner`;
  const secondaryTextEl = secondaryText && (
    <span className={`${ns}-color-grey-muted ${baseClass}--secondary`} ref={secondaryTextRef}>
      {secondaryText}
    </span>
  );
  const valueEl = value && (
    <span className={`${baseClass}--text`} ref={valueRef}>
      {value}
    </span>
  );

  const contents = (
    <>
      <LeftVisualEl
        avatar={avatar}
        avatarProps={avatarProps}
        isInvalid={isInvalid}
        size={childSizeClassMap[size]}
      />
      {secondaryTextEl}
      {valueEl}
    </>
  );

  return href || onClick ? (
    <XUIButton
      {...{
        href,
        target,
        title,
        onClick,
      }}
      className={className}
      isLink={!!href}
      qaHook={innerPillQaHook}
      size={size}
      variant="unstyled"
    >
      {contents}
    </XUIButton>
  ) : (
    <span className={className} data-automationid={innerPillQaHook}>
      {contents}
    </span>
  );
};

export default XUIInnerPill;

XUIInnerPill.propTypes = {
  /** An avatar component. May be used instead of avatarProps */
  avatar: PropTypes.element,
  /** Props for the avatar to be displayed, must adhere to the XUIAvatar component API
   * described at https://github.dev.xero.com/UXE/xui-avatar. Version 6.0.0+. Not providing
   * props will omit the avatar entirely. */
  avatarProps: PropTypes.object,
  /** This will make the value an `anchor` element instead of a `span` element and adds the
   * href as the link. */
  href: PropTypes.string,
  /** The pill is invalid and should display the invalid icon */
  isInvalid: PropTypes.bool,
  /** Callback to fire when the main pill content is clicked. */
  onClick: PropTypes.func,
  /** `. */
  qaHook: PropTypes.string,
  /** Adds a muted secondary text for the pill, appears before the main value. */
  secondaryText: PropTypes.node,
  /** The ref to the secondaryText text node - Used to determine showing tooltips when text is truncated */
  secondaryTextRef: PropTypes.object,
  /** The size of the pill */
  size: PropTypes.oneOf(Object.keys(childSizeClassMap)),
  /** When an `href` is supplied, adds a target attribute, else is ignored. */
  target: PropTypes.string,
  /** The title attribute to apply on the pill. */
  title: PropTypes.string,
  /** The text to display inside the pill. */
  value: PropTypes.node,
  /** The ref to the value text node - Used to determine showing tooltips when text is truncated */
  valueRef: PropTypes.object,
};

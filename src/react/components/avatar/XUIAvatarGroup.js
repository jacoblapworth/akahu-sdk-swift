import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import XUIAvatarCounter from './XUIAvatarCounter';
import { sizeClassNames, classNames } from './constants';

const XUIAvatarGroup = ({ children, className, qaHook, maxAvatars, avatarSize }) => {
  if (maxAvatars === 0) {
    return null;
  }

  const childCount = React.Children.count(children);
  const extraChildCount = maxAvatars && childCount > maxAvatars ? childCount - maxAvatars + 1 : 0;
  const lastChildIndex = extraChildCount ? maxAvatars - 1 : childCount;
  let variant = 'standard';

  const childrenToRender =
    avatarSize || extraChildCount
      ? React.Children.map(children, (child, idx) => {
          ({ variant } = child.props);
          const [id] = nanoid(10);
          return idx < lastChildIndex
            ? React.cloneElement(child, {
                key: `xui-${id}`,
                ...child.props,
                size: avatarSize,
              })
            : null;
        })
      : children;

  const counter = extraChildCount ? (
    <XUIAvatarCounter count={extraChildCount} size={avatarSize} variant={variant} />
  ) : null;

  return (
    <div className={cn(classNames.group, className)} data-automationid={qaHook}>
      {childrenToRender}
      {counter}
    </div>
  );
};

XUIAvatarGroup.propTypes = {
  /** The size to apply to all avatars contained within the group. This will
   * override any individual avatar's size settings. */
  avatarSize: PropTypes.oneOf(Object.keys(sizeClassNames)),
  children: PropTypes.node,
  className: PropTypes.string,
  /** The maximum number of avatars to show */
  maxAvatars(props, propName) {
    const maxAvatars = props[propName];

    if (maxAvatars && typeof maxAvatars !== 'number') {
      return new Error('maxAvatars prop must be a number if specified');
    }

    if (typeof maxAvatars === 'number' && (!Number.isFinite(maxAvatars) || maxAvatars < 0)) {
      return new Error('maxAvatars prop must be a positive integer');
    }
    return null;
  },
  qaHook: PropTypes.string,
};

export default React.memo(XUIAvatarGroup);

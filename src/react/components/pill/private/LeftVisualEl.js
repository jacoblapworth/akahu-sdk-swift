import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import { baseClass, childSizes } from './constants';

const LeftVisualEl = ({ avatar, avatarProps, isInvalid, size }) => {
  if (!isInvalid && !avatarProps && !avatar) {
    return null;
  }

  const avatarClass = `${baseClass}--avatar`;
  const avatarClasses = cn(avatarProps && avatarProps.className, avatarClass);

  const pillAvatar = avatar
    ? React.cloneElement(avatar, { className: cn(avatar.props.className, avatarClasses) })
    : (avatarProps && <XUIAvatar {...avatarProps} className={avatarClasses} size={size} />) || null;

  return isInvalid ? (
    <div className={cn(avatarClass, `${baseClass}--erroricon`, `${baseClass}--erroricon-${size}`)}>
      <XUIIcon
        color="red"
        icon={exclamation}
        size={size && size.indexOf('small') === -1 ? size : 'medium'}
      />
    </div>
  ) : (
    pillAvatar
  );
};

export default LeftVisualEl;

LeftVisualEl.propTypes = {
  avatar: PropTypes.element,
  avatarProps: PropTypes.object,
  isInvalid: PropTypes.bool,
  size: PropTypes.oneOf(childSizes),
};

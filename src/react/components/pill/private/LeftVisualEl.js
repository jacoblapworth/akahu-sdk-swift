import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import basePillClass from './constants';

export default function LeftVisualEl({ isInvalid, avatarProps, avatar }) {
	if (!isInvalid && !avatarProps && !avatar) { return null; }

	const avatarClasses = cn(
		avatarProps && avatarProps.className,
		`${basePillClass}--avatar`,
	);

	const pillAvatar = avatar
		? React.cloneElement(avatar, { className: cn(avatar.props.className, avatarClasses) })
		: (avatarProps && <XUIAvatar {...avatarProps} className={avatarClasses} />)
			|| null;

	return isInvalid ? (
		<div className={`${basePillClass}--erroricon`}>
			<XUIIcon icon={exclamation} color="red" />
		</div>
	) : pillAvatar;
}

LeftVisualEl.propTypes = {
	isInvalid: PropTypes.bool,
	avatarProps: PropTypes.object,
	avatar: PropTypes.element,
};

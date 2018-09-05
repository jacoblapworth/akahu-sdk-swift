import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import { baseClass, childSizes } from './constants';

export default function LeftVisualEl({ isInvalid, avatarProps, size }) {
	if (!isInvalid && !avatarProps) { return null; }

	const avatarClass = `${baseClass}--avatar`;
	const avatarClasses = cn(
		avatarProps && avatarProps.className,
		avatarClass,
	);

	return isInvalid ? (
		<div
			className={cn(
				avatarClass,
				`${baseClass}--erroricon`,
				`${baseClass}--erroricon-${size}`,
			)}
		>
			<XUIIcon icon={exclamation} color="red" />
		</div>
	) : <XUIAvatar {...avatarProps} className={avatarClasses} size={size} />;
}

LeftVisualEl.propTypes = {
	isInvalid: PropTypes.bool,
	avatarProps: PropTypes.object,
	size: PropTypes.oneOf(childSizes),
};

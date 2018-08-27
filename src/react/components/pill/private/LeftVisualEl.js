import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import basePillClass from './constants';

export default function LeftVisualEl({ isInvalid, avatarProps }) {
	if (!isInvalid && !avatarProps) { return null; }

	const avatarClasses = cn(
		avatarProps && avatarProps.className,
		`${basePillClass}--avatar`,
	);

	return isInvalid ? (
		<div className={`${basePillClass}--erroricon`}>
			<XUIIcon icon={exclamation} color="red" />
		</div>
	) : <XUIAvatar {...avatarProps} className={avatarClasses} />;
}

LeftVisualEl.propTypes = {
	isInvalid: PropTypes.bool,
	avatarProps: PropTypes.object,
};

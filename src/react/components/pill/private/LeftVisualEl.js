import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import { baseClass, childSizes } from './constants';

export default class LeftVisualEl extends PureComponent {
	render() {
		const { isInvalid, avatarProps, size, avatar } = this.props;
		if (!isInvalid && !avatarProps && !avatar) { return null; }

		const avatarClass = `${baseClass}--avatar`;
		const avatarClasses = cn(
			avatarProps && avatarProps.className,
			avatarClass,
		);

		const pillAvatar = avatar
			? React.cloneElement(avatar, { className: cn(avatar.props.className, avatarClasses) })
			: (avatarProps && <XUIAvatar {...avatarProps} className={avatarClasses} size={size} />)
				|| null;

		return isInvalid ? (
			<div
				className={cn(
					avatarClass,
					`${baseClass}--erroricon`,
					`${baseClass}--erroricon-${size}`,
				)}
			>
				<XUIIcon
					size={size && size.indexOf('small') === -1 ? size : 'standard'}
					icon={exclamation}
					color="red"
				/>
			</div>
		) : pillAvatar;
	}
}

LeftVisualEl.propTypes = {
	isInvalid: PropTypes.bool,
	avatarProps: PropTypes.object,
	size: PropTypes.oneOf(childSizes),
	avatar: PropTypes.element,
};

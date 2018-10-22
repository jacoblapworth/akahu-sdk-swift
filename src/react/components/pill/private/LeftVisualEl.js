import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import exclamation from '@xero/xui-icon/icons/exclamation';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import { baseClass, childSizes } from './constants';

export default class LeftVisualEl extends PureComponent {
	render() {
		const { isInvalid, avatarProps, size } = this.props;
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
				<XUIIcon
					size={size.indexOf('small') === -1 ? size : 'standard'}
					icon={exclamation}
					color="red"
				/>
			</div>
		) : <XUIAvatar {...avatarProps} className={avatarClasses} size={size} />;
	}
}

LeftVisualEl.propTypes = {
	isInvalid: PropTypes.bool,
	avatarProps: PropTypes.object,
	size: PropTypes.oneOf(childSizes),
};

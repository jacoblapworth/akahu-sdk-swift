import React from 'react';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';
import XUIAvatarCounter from './XUIAvatarCounter';
import XUIAvatar from './XUIAvatar';
import XUISimpleAvatar from './XUISimpleAvatar';
import {sizeMap} from './constants';

const propTypes = {
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	children: React.PropTypes.node,

	/** @property {String} [avatarSize] The size of all avatars in this group. This will override any individual avatar sizes */
	avatarSize: React.PropTypes.oneOf(Object.keys(sizeMap)),

	/** @property {Number} [maxAvatars] The maximum number of avatars to show. Must be greater than 0 to take effect */
	maxAvatars: React.PropTypes.number
};

export default function XUIAvatarGroup(props) {
	const { maxAvatars, avatarSize } = props;
	const childCount = (props.children && props.children.length) || 0;
	const extraChildCount = (maxAvatars && childCount > maxAvatars) ? childCount - maxAvatars + 1 : 0;

	const counter = extraChildCount ? <XUIAvatarCounter count={extraChildCount} size={avatarSize} /> : null;
	let children = extraChildCount ? props.children.slice(1, maxAvatars) : props.children;

	const className = cn(CSSClasses.Avatar.GROUP, props.className);

	if(avatarSize) {
		children = React.Children.map(children, function(child) {
			const type = child.type;

			if(type === XUIAvatar || type === XUISimpleAvatar || type === XUIAvatarCounter) {
				return React.cloneElement(child, {
					size: avatarSize
				});
			} else {
				return child;
			}
		});
	}

	return (
		<div data-automationid={props.qaHook} className={className}>
			{children}
			{counter}
		</div>
	);
}

XUIAvatarGroup.propTypes = propTypes;

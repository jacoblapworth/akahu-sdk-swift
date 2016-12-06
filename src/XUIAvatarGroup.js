import React, {PureComponent} from 'react';
import cn from 'classnames';
import XUIAvatarCounter from './XUIAvatarCounter';
import XUIAvatar from './XUIAvatar';
import XUISimpleAvatar from './XUISimpleAvatar';
import { sizeClassNames, classNames } from './constants';

const propTypes = {
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	children: React.PropTypes.node,

	/** @property {String} [avatarSize] The size to apply to all avatars contained within the group. This will override any individual avatar's size settings. */
	avatarSize: React.PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** @property {Number} [maxAvatars] The maximum number of avatars to show. Must be greater than 0 to take effect */
	maxAvatars: function(props, propName) {
		const maxAvatars = props[propName];
		if(maxAvatars != null && (typeof maxAvatars !== 'number' || !isFinite(maxAvatars) || maxAvatars <= 0)) {
			return new Error('maxAvatars prop must be a positive integer greater than zero');
		}
	}
};

export default class XUIAvatarGroup extends PureComponent {
	render() {
		const { props } = this;
		const { maxAvatars, avatarSize } = props;
		const childCount = (props.children && props.children.length) || 0;
		const extraChildCount = (maxAvatars && childCount > maxAvatars) ? childCount - maxAvatars + 1 : 0;

		const counter = extraChildCount ? <XUIAvatarCounter count={extraChildCount} size={avatarSize} /> : null;
		let children = extraChildCount ? props.children.slice(1, maxAvatars) : props.children;

		const className = cn(classNames.group, props.className);

		if(avatarSize) {
			children = React.Children.map(children, function(child) {
				const Type = child.type;

				if(Type === XUIAvatar || Type === XUISimpleAvatar || Type === XUIAvatarCounter) {
					return <Type {...child.props} size={avatarSize} />;
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

}

XUIAvatarGroup.propTypes = propTypes;

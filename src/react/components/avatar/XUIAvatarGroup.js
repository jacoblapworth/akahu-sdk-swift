import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import uuidv4 from 'uuid/v4'
import XUIAvatarCounter from './XUIAvatarCounter';
import { sizeClassNames, classNames } from './constants';

export default class XUIAvatarGroup extends PureComponent {
	render() {
		const { props } = this;
		const { maxAvatars, avatarSize } = props;

		if (maxAvatars === 0) {
			return null;
		}

		const childCount = React.Children.count(props.children);
		const extraChildCount = (maxAvatars && childCount > maxAvatars) ? childCount - maxAvatars + 1 : 0;
		const lastChildIndex = extraChildCount ? maxAvatars - 1 : childCount;

		const counter = extraChildCount ? <XUIAvatarCounter count={extraChildCount} size={avatarSize} /> : null;
		const className = cn(classNames.group, props.className);
		let children = props.children;

		if(avatarSize || counter) {
			children = React.Children.map(props.children, function(child, idx) {
				return idx < lastChildIndex ? React.cloneElement(child, {
					key: uuidv4(),
					...child.props,
					size: avatarSize
				}) : null;
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

XUIAvatarGroup.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,

	/** The size to apply to all avatars contained within the group. This will override any individual avatar's size settings. */
	avatarSize: PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** The maximum number of avatars to show */
	maxAvatars: function(props, propName) {
		const maxAvatars = props[propName];

		if(maxAvatars && typeof maxAvatars !== 'number') {
			return new Error('maxAvatars prop must be a number if specified');
		}

		if(typeof maxAvatars === 'number' && (!Number.isFinite(maxAvatars) || maxAvatars < 0)) {
			return new Error('maxAvatars prop must be a positive integer');
		}
	}
};

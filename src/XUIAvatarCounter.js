import React from 'react';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';
import {sizeMap} from './constants';

const propTypes = {
	qaHook: React.PropTypes.string,
	className: React.PropTypes.string,

	/** @property {Number|String} [count] The count to display. If this is a string, it is passed through transparently. If it is a number, it will render with a + prefix */
	count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

	/** @property {String} [size=medium] The size of the counter. Can be small, medium, large or xlarge */
	size: React.PropTypes.oneOf(Object.keys(sizeMap))
};

const defaultProps = {
	size: 'medium'
};

export default function XUIAvatarCounter(props) {
	const { count } = props;
	const className = cn(
		CSSClasses.Avatar.BASE,
		CSSClasses.Avatar.COUNTER,
		CSSClasses.Avatar[sizeMap[props.size]],
		props.className
	);

	let value;

	if(typeof count === 'string') {
		value = count;
	} else if(count > 0) {
		value = '+' + count;
	} else {
		value = String(count);
	}

	return value ? <span data-automationid={props.qaHook} className={className}>{value}</span> : null;
}

XUIAvatarCounter.propTypes = propTypes;
XUIAvatarCounter.defaultProps = defaultProps;

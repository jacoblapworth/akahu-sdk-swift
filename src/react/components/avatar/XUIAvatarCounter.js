import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import cn from 'classnames';
import { sizeClassNames, classNames } from './constants';

export default class XUIAvatarCounter extends PureComponent {
	render() {
		const { count, size, qaHook, className } = this.props;

		const counterClassNames = cn(
			classNames.base,
			classNames.counter,
			sizeClassNames[size],
			className
		);

		let value;

		if (typeof count === 'string') {
			value = count;
		} else if (count > 0) {
			value = '+' + count;
		} else {
			value = String(count);
		}

		return value ? <span data-automationid={qaHook} className={counterClassNames}>{value}</span> : null;
	}
}

XUIAvatarCounter.propTypes = {
	qaHook: PropTypes.string,
	className: PropTypes.string,

	/** The count to display. If this is a string, it is passed through transparently. If it is a number, it will render with a + prefix */
	count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

	/** The size of the counter. Can be small, medium, large or xlarge */
	size: PropTypes.oneOf(Object.keys(sizeClassNames)).isRequired
};

XUIAvatarCounter.defaultProps = {
	size: 'medium'
};

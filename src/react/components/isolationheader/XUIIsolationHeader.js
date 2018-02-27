import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import cn from 'classnames';

export default class XUIIsolationHeader extends PureComponent {
	render() {
		const header = this;
		const {
			qaHook,
			className,
			isInverted,
			children
		} = header.props;

		const classNames = cn(
			className,
			'xui-isolationheader',
			isInverted ? 'xui-isolationheader-inverted' : 'xui-isolationheader-standard'
		);

		return (
			<div className={classNames} data-automationid={qaHook}>
				{children}
			</div>
		);
	}
}

XUIIsolationHeader.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	isInverted: PropTypes.bool
};

import XUIButton from '../../button';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import cn from 'classnames';

export default class XUIIsolationHeaderButton extends PureComponent {
	render() {
		const {
			className,
			variant,
			isInverted,
			isBorderless,
			...other
		} = this.props;

		const isIcon = variant && variant.indexOf('icon') > -1;

		const classNames = cn(
			className,
			{
				'xui-button-icon-large': isIcon,
				'xui-button-small': isBorderless,
				'xui-button-borderless-inverted': !isIcon && isBorderless && isInverted,
				'xui-button-borderless-standard': !isIcon && isBorderless && !isInverted,
				'xui-button-inverted': !isIcon && isInverted && !isBorderless,
				'xui-button-icon-inverted': isIcon && isInverted
			}
		);

		return <XUIButton {...other} className={classNames} />;
	}
}

XUIIsolationHeaderButton.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.string,
	isInverted: PropTypes.bool,
	isBorderless: PropTypes.bool
};

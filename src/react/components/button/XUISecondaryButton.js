import React, { PureComponent } from 'react';
import XUIButton from './XUIButton';
import XUIButtonCaret from './XUIButtonCaret';
import { ButtonPropTypes, ButtonDefaultProps } from './private/propTypes';
import cn from 'classnames';

export default class XUISplitButton extends PureComponent {
	render() {
		const { className, ...spreadProps } = this.props;
		spreadProps.children = null;
		return (
			<XUIButton {...spreadProps} className={cn('xui-button-split', className)} isGrouped={true}>
				<XUIButtonCaret />
			</XUIButton>
		);
	}
}

const SecondaryButtonPropTypes = {...ButtonPropTypes};
delete SecondaryButtonPropTypes.children;

XUISplitButton.propTypes = SecondaryButtonPropTypes;
XUISplitButton.defaultProps = ButtonDefaultProps;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {Portal} from 'react-portal';

export default class XUIToastWrapper extends React.PureComponent {
	render() {
		const {className, qaHook, children} = this.props;
		const classNames = cn(className, 'xui-toastwrapper');
		const isOpened = React.Children.count(children) > 0;

		return isOpened ? (
			<Portal>
				<div data-automationid={qaHook} className={cn(classNames, 'xui-container')}>
					{children}
				</div>
			</Portal>
		) : null;
	}
}

XUIToastWrapper.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node
};

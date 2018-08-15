import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';
import portalContainer from '../helpers/portalContainer';
import { ns } from '../helpers/xuiClassNamespace';
import { baseClass } from './private/constants';

export default class XUIToastWrapper extends PureComponent {
	render() {
		const {
			className,
			qaHook,
			children,
		} = this.props;
		const classNames = cn(className, `${baseClass}wrapper`);
		const isOpened = React.Children.count(children) > 0;

		return isOpened ? (
			<Portal node={portalContainer()}>
				<div data-automationid={qaHook} className={cn(classNames, `${ns}-container`)}>
					{children}
				</div>
			</Portal>
		) : null;
	}
}

XUIToastWrapper.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,
};

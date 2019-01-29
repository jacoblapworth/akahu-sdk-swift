import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel--section`;

export default class XUIPanelSection extends PureComponent {
	render() {
		const {
			qaHook,
			className,
			children,
			headerText,
			headerClassName,
			...spreadProps
		} = this.props;
		const classes = cn(baseClass, className);
		const headerClasses = cn(`${baseClass}--header`, headerClassName);
		const header = headerText && <div className={headerClasses}>{headerText}</div>;

		return (
			<div {...spreadProps} className={classes} data-automationid={qaHook}>
				{header}
				{children}
			</div>
		);
	}
}

XUIPanelSection.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/**
	 * Text to be placed in a "xui-panel--section-header" node
	 */
	headerText: PropTypes.string,
	/**
	 * Classes to add to the "xui-panel--section-header" node
	 */
	headerClassName: PropTypes.string,
};

XUIPanelSection.defaultProps = {};

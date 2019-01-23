import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-panel`;

export default class XUIPanel extends PureComponent {
	render() {
		const {
			qaHook,
			className,
			children,
			heading,
			footer,
			sidebar,
			tagName,
			...spreadProps
		} = this.props;
		const classes = cn(baseClass, className, sidebar && `${ns}-u-flex`);
		const Tag = tagName;
		if (!sidebar) {
			return (
				<Tag {...spreadProps} className={classes} data-automationid={qaHook}>
					{heading}
					{children}
					{footer}
				</Tag>
			);
		}
		return (
			<Tag {...spreadProps} className={classes} data-automationid={qaHook}>
				<div className={`${baseClass}--sidebar`}>
					{sidebar}
				</div>
				<div className={`${ns}-u-flex-1`}>
					{heading}
					{children}
					{footer}
				</div>
			</Tag>
		);
	}
}

XUIPanel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,
	/**
	 * The header for a panel. We recommend XUIPanelHeading.
	 */
	heading: PropTypes.node,
	/**
	 * The footer for a panel. We recommend XUIPanelFooter.
	 */
	footer: PropTypes.node,
	/**
	 * A node which will be wrapped and rendered as a panel sidebar.
	 */
	sidebar: PropTypes.node,
	/**
	 * Main element tag type, for semantic purposes (eg. main or aside). Defaults to "div"
	 */
	tagName: PropTypes.string,
};

XUIPanel.defaultProps = {
	tagName: 'div',
};

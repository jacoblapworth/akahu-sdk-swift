import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {ns} from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-pageheading`;

const buildTitleAndTabs = (title, tabs) => {
	const builtTitle = title && <h1 className={`${baseClass}--title`}>{title}</h1>;
	if (builtTitle && !tabs) {
		return (builtTitle);
	} else if (tabs) {
		// Allows for title + tabs or tabs only
		const clonedTabs = React.cloneElement(tabs, {
			// Make sure this is horizontal in the pagehead
			isHorizontal : true
		});
		return (
			<div className={`${baseClass}--tabs`}>
				{builtTitle}
				{clonedTabs}
			</div>
		)
	}
};

export default class XUIPageHeader extends PureComponent {
	render() {
		const {
			title,
			tabs,
			breadcrumb,
			className,
			children,
			actions,
			hasLayout,
			contentClassName,
			...spreadProps
		} = this.props;
		const classes = cn(className, baseClass);
		const clonedBreadcrumb = breadcrumb && React.cloneElement(breadcrumb, {
			// Add the necessary pagehead class to the provided breadcrumb.
			className : cn(
				breadcrumb.props.className,
				`${baseClass}--breadcrumbs`
			)
		});
		const builtTitleAndTabs = buildTitleAndTabs(title, tabs);
		const builtActions = actions && <div className={`${baseClass}--actions`}>{actions}</div>;
		const layoutClass = hasLayout ? `${baseClass}--content-layout` : '';
		const divClasses = cn(`${baseClass}--content`, layoutClass, contentClassName);

		return (
			<header {...spreadProps} className={classes}>
				<div className={divClasses}>
					{!builtTitleAndTabs && clonedBreadcrumb}
					{builtTitleAndTabs}
					{children}
					{builtActions}
				</div>
			</header>
		)
	}
}

XUIPageHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * CSS class(es) to add to the the pageheading--content element. xui-page-width-standard would go here
	 */
	contentClassName: PropTypes.string,
	/**
	 * Applies default layout styling.
	 */
	hasLayout: PropTypes.bool,
	/**
	 * Plain text title. Not to be combined with breadcrumbs
	 */
	title: PropTypes.string,
	/**
	 * Horizontal picklist to act as tabs. XUIPicklist
	 */
	tabs: PropTypes.element,
	/**
	 * Instantiated breadcrumb component. Will not display if tabs or title are supplied
	 */
	breadcrumb: PropTypes.element,
	/**
	 * Components or html to be right-aligned in the pageheading
	 */
	actions: PropTypes.node
};

XUIPageHeader.defaultProps = {
	hasLayout: true
};
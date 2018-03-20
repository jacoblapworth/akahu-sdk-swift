import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import XUIIcon from '../icon/XUIIcon';
import arrow from '@xero/xui-icon/icons/arrow-small';

const baseClass = "xui-breadcrumb";

export default class XUIBreadcrumb extends PureComponent {
	getCrumbLabel = (crumb) => {
		if (!crumb.href) {
			return crumb.label;
		} else {
			return (
				<a href={crumb.href} className={`${baseClass}--link`}>{crumb.label}</a>
			)
		}
	};

	render() {
		const {
			breadcrumbs,
			className
		} = this.props;
		const listClasses = cn(className, `${baseClass}s`);

		const crumbElements = [];
		breadcrumbs.forEach((crumb, itemIndex) => {
			crumbElements.push(
				<li key={itemIndex} className={baseClass}>{this.getCrumbLabel(crumb)}</li>
			);
			if (itemIndex !== breadcrumbs.length - 1) {
				crumbElements.push(
					<li key={`arrow-${itemIndex}`} className={`${baseClass}`}>
						<XUIIcon className={`${baseClass}--icon xui-u-rotate-270`} path={arrow} />
					</li>
				)
			}
		});

		return (
			<ol className={listClasses}>
				{crumbElements}
			</ol>
		);
	}
}

XUIBreadcrumb.propTypes = {
	className: PropTypes.string,
	/**
	 * Array of objects from which to build breadcrumbs.
	 * Each should consist of a label and optional href.
	 */
	breadcrumbs: PropTypes.array,
};

XUIBreadcrumb.defaultProps = {};

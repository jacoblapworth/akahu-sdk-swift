import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import arrow from '@xero/xui-icon/icons/arrow-small';
import XUIIcon from '../icon/XUIIcon';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-breadcrumb`;

const getCrumbLabel = crumb => {
	if (crumb.type) { // HTML nodes and React components have a type property. Objects do not.
		return React.cloneElement(crumb, {
			className: cn(crumb.className, `${baseClass}--link`),
		});
	} else if (!crumb.href) {
		return crumb.label;
	}
	return (
		<a href={crumb.href} className={`${baseClass}--link`}>{crumb.label}</a>
	);
};

export default class XUIBreadcrumb extends PureComponent {
	render() {
		const {
			breadcrumbs,
			className,
		} = this.props;
		const listClasses = cn(className, `${baseClass}s`);
		const crumbElements = [];
		/* eslint-disable react/no-array-index-key */
		breadcrumbs.forEach((crumb, itemIndex) => {
			crumbElements.push((
				<li key={itemIndex} className={baseClass}>
					{getCrumbLabel(crumb)}
				</li>
			));
			if (itemIndex !== breadcrumbs.length - 1) {
				crumbElements.push((
					<li key={`arrow-${itemIndex}`} className={`${baseClass}-arrow`}>
						<XUIIcon
							className={`${baseClass}--icon`}
							rotation={270}
							icon={arrow}
							isBoxed
						/>
					</li>
				));
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
	 * Array of objects or nodes from which to build breadcrumbs.
	 */
	breadcrumbs: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			href: PropTypes.string,
		}),
	])),
};

XUIBreadcrumb.defaultProps = {};

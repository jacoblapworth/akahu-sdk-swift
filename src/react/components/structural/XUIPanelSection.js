import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/6-containers/_panels.scss';

const baseClass = `${ns}-panel--section`;

export default class XUIPanelSection extends PureComponent {
	render() {
		const {
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
			<div {...spreadProps} className={classes}>
				{header}
				{children}
			</div>
		);
	}
}

XUIPanelSection.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
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

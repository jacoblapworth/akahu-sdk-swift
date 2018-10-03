import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/6-containers/_panels.scss';

const XUIPanelFooter = ({
	children,
	className,
	tagName,
	...spreadProps
}) => {
	const classes = cn(className, `${ns}-panel--footer`);
	const Tag = tagName;
	return (
		<Tag
			{...spreadProps}
			className={classes}
		>
			{children}
		</Tag>
	);
};

XUIPanelFooter.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Main element tag type. Defaults to "footer"
	 */
	tagName: PropTypes.string,
};

XUIPanelFooter.defaultProps = {
	tagName: 'footer',
};

export { XUIPanelFooter as default };

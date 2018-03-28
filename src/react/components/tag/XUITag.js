import '../helpers/xuiGlobalChecks';
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { baseClass, variants } from './private/constants';

const XUITag = ({className, variant, qaHook, children}) =>
	<span
		className={cn(
			baseClass,
			className,
			variants[variant]
		)}
		role="status"
		data-automationid={qaHook}
	>
		{children}
	</span>;

XUITag.propTypes = {
	children: PropTypes.node,
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/* Type of tag to render */
	variant: PropTypes.oneOf(Object.keys(variants)),
};

XUITag.defaultProps = {
	variant: 'standard'
};

export { XUITag as default, variants };

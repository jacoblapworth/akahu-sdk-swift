import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { rowVariants } from './private/constants';

export default class XUIRow extends PureComponent {
	render() {
		const {
			children,
			className,
			variant,
			...otherProps
		} = this.props;
		const rowClass = "xui-row" + (rowVariants[variant] ? `-${rowVariants[variant]}` : '');
		const classes = cn(className, rowClass);

		return (
			<div className={classes} {...otherProps}>
				{children}
			</div>
		)
	}
}

XUIRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/* Type of row to render */
	variant: PropTypes.oneOf(Object.keys(rowVariants)),
};

XUIRow.defaultProps = {
	variant: 'standard'
};

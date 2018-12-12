import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-overview`;

export default class XUIOverviewBlock extends PureComponent {
	render() {
		const {
			children,
			className,
			hasLayout,
			textAlignment,
			hasBorder,
			hasBackground,
			...spreadProps
		} = this.props;

		const classes = cn(
			baseClass,
			className,
			hasBorder && `${baseClass}-has-border`,
			hasBackground && `${baseClass}-solid`,
			`${baseClass}-text-align-${textAlignment}`,
			hasLayout && `${baseClass}-layout`,
		);

		return (
			<div {...spreadProps} className={classes}>
				{children}
			</div>
		);
	}
}

XUIOverviewBlock.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Applies default layout styling.
	 */
	hasLayout: PropTypes.bool,
	/** How to align text, generally, across all sections */
	textAlignment: PropTypes.oneOf(['left', 'center', 'right']),
	/** Whether to show wrapping border on the entire block. Defaults to true */
	hasBorder: PropTypes.bool,
	/** Whether the block should have a solid background. Defaults to true */
	hasBackground: PropTypes.bool,
};

XUIOverviewBlock.defaultProps = {
	hasLayout: true,
	textAlignment: 'center',
	hasBorder: true,
	hasBackground: true,
};

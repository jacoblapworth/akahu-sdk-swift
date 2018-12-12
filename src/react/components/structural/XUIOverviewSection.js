import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { overviewSentiments } from './private/constants';

const baseClass = `${ns}-overview`;

export default class XUIOverviewSection extends PureComponent {
	render() {
		const {
			className,
			sentiment,
			label,
			value,
			textAlignment,
			children,
			...spreadProps
		} = this.props;

		const classes = cn(
			className,
			// Only set the alignment here, if explicitly provided. Otherwise, just inherit.
			textAlignment && `${baseClass}-text-align-${textAlignment}`,
			`${baseClass}--section`,
		);

		const valueClass = cn(
			`${baseClass}--value`,
			(sentiment && overviewSentiments[sentiment]) &&
				`${ns}-textcolor-${overviewSentiments[sentiment]}`,
		);

		return (
			<section {...spreadProps} className={classes}>
				<div className={`${baseClass}--label`}>{label}</div>
				<div className={valueClass}>{value}</div>
				{children}
			</section>
		);
	}
}

XUIOverviewSection.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	/**
	 * Label for the section
	 */
	label: PropTypes.string,
	/**
	 * Value to appear below the label
	 */
	value: PropTypes.string,
	/**
	 * Sentiment for styling the value. Can be 'positive', 'negative', 'muted', or
	 * undefined for a default appearance
	 */
	sentiment: PropTypes.oneOf(Object.keys(overviewSentiments)),
	/** How to align text in this section. Leave undefined to default
	 * to the alignment of the parent block. */
	textAlignment: PropTypes.oneOf(['left', 'center', 'right']),
};


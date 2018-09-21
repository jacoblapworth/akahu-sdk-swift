import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

import { overviewSentiments } from './private/constants';

import '../../../sass/7-components/_overview.scss';

const baseClass = `${ns}-overview`;

export default class XUIOverviewSection extends PureComponent {
	render() {
		const {
			className,
			sentiment,
			label,
			value,
			...spreadProps
		} = this.props;
		const classes = cn(`${baseClass}--section`, className);
		const valueClass = cn(
			`${baseClass}--value`,
			(sentiment && overviewSentiments[sentiment]) &&
				`${ns}-textcolor-${overviewSentiments[sentiment]}`,
		);

		return (
			<section {...spreadProps} className={classes}>
				<div className={`${baseClass}--label`}>{label}</div>
				<div className={valueClass}>{value}</div>
			</section>
		);
	}
}

XUIOverviewSection.propTypes = {
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
};

XUIOverviewSection.defaultProps = {};

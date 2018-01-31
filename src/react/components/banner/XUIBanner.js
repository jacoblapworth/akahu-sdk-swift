import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types'
import XUIIcon from '../../icon';
import crossIcon from '@xero/xui-icon/icons/cross';
import { sentimentMap } from './private/sentiments';


const sentiments = Object.keys(sentimentMap);

export default function XUIBanner(props) {
	const { className, qaHook, sentiment, onCloseClick, children, defaultLayout } = props;
	const closeQAHook = qaHook && `${qaHook}-close--button`;

	const closeButton = onCloseClick && (
		<button data-automationid={closeQAHook} className={cn('xui-button', 'xui-button-icon', 'xui-banner--close')} title="Close" onClick={onCloseClick}>
			<XUIIcon path={crossIcon} />
		</button>
	);

	const sentimentData = sentimentMap[sentiment];

	const sentimentClass = sentimentData && sentimentData.class;
	const role = props.role || (sentimentData && sentimentData.role) || 'status';

	const classes = cn(
		className,
		'xui-banner',
		{'xui-banner-layout': defaultLayout},
		'xui-banner-animated',
		sentimentClass
	);

	return (
		<div data-automationid={qaHook} className={classes} role={role}>
			{closeButton}
			{children}
		</div>
	);
}

XUIBanner.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,
	children: PropTypes.node,

	/** Alters the banner to show positive or negative sentiment */
	sentiment: PropTypes.oneOf(sentiments),

	/** Handles the click event for the action */
	onCloseClick: PropTypes.func,

	/** Defines whether the default layout class should be supplied */
	defaultLayout: PropTypes.bool,

	/** Applies a role attribute to the toast element. This will override any component-determined value. */
	role: PropTypes.string
};

XUIBanner.defaultProps = {
	defaultLayout: true
};

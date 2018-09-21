import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import crossIcon from '@xero/xui-icon/icons/cross';
import XUIButton from '../button/XUIButton';
import XUIIcon from '../../icon';
import sentimentMap from './private/sentiments';
import { ns } from '../helpers/xuiClassNamespace';

import '../../../sass/7-components/_usermessaging.banners.scss';

const sentiments = Object.keys(sentimentMap);

export default function XUIBanner({
	className,
	qaHook,
	sentiment,
	onCloseClick,
	children,
	defaultLayout,
	role,
}) {
	const closeButton = onCloseClick && (
		<XUIButton
			className={`${ns}-banner--close`}
			title="Close"
			onClick={onCloseClick}
			variant="icon"
			size="small"
			qaHook={qaHook && `${qaHook}-close--button`}
		>
			<XUIIcon icon={crossIcon} />
		</XUIButton>
	);

	const sentimentData = sentimentMap[sentiment];

	const sentimentClass = sentimentData && sentimentData.class;
	const bannerRole = role || (sentimentData && sentimentData.role) || 'status';

	const classes = cn(
		className,
		`${ns}-banner`,
		{
			[`${ns}-banner-layout`]: defaultLayout,
		},
		sentimentClass,
	);

	return (
		<div data-automationid={qaHook} className={classes} role={bannerRole}>
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

	/** Applies a role attribute to the toast element. This will override any
	 * component-determined value. */
	role: PropTypes.string,
};

XUIBanner.defaultProps = {
	defaultLayout: true,
};

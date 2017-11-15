import React from 'react';
import PropTypes from 'prop-types';
import search from '@xero/xui-icon/icons/search';
import XUIIcon from '../icon/XUIIcon';
import cn from 'classnames';

const XUIAutocompleterEmptyState = props => (
	<div
		className={cn( 
			"xui-u-flex xui-u-flex-justify-center xui-padding-vertical-large xui-u-flex-vertical xui-u-flex-horizontallycentered xui-text-muted", 
			props.className)
		}
		data-automationid={props.qaHook}
		id={props.id}
	>
		<XUIIcon path={props.iconPath} size="large" />
		{props.children}
	</div>
);

XUIAutocompleterEmptyState.propTypes = {
	qaHook: PropTypes.string,
	id: PropTypes.string,
	iconPath: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string
};

XUIAutocompleterEmptyState.defaultProps = {
	children: 'No results found',
	iconPath: search,
};

export default XUIAutocompleterEmptyState;

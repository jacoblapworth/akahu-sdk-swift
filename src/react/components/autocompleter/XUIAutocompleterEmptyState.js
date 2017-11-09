import React from 'react';
import PropTypes from 'prop-types';
import search from '@xero/xui-icon/icons/search';
import XUIIcon from '../icon/XUIIcon';

const XUIAutocompleterEmptyState = props => (
	<div
		className="xui-u-flex xui-padding-vertical-large xui-u-flex-vertical xui-u-flex-verticallycentered xui-textcolor-muted"
		data-automationid={props.qaHook}
		id={props.id}
	>
		<XUIIcon path={props.path} size="large" />
		{props.children}
	</div>
);

XUIAutocompleterEmptyState.propTypes = {
	qaHook: PropTypes.string,
	id: PropTypes.string,
	path: PropTypes.string,
	children: PropTypes.node
};

XUIAutocompleterEmptyState.defaultProps = {
	children: 'No results found',
	path: search,
};

export default XUIAutocompleterEmptyState;

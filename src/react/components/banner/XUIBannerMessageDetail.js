import React  from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default function XUIBannerMessageDetail(props) {
	const className = cn(props.className, 'xui-banner--messagedetail');

	return (
		<ul className={className}>
			{props.messageDetails.map(listText => (<li key={listText}>{listText}</li>))}
		</ul>
	);
}

XUIBannerMessageDetail.propTypes = {
	className: PropTypes.string,

	/** @property {string[]} The banner message details to be displayed as a list */
	messageDetails: PropTypes.arrayOf(PropTypes.string).isRequired
};
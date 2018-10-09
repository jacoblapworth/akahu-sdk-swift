import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved
import XUIIcon from '../../src/react/icon';
import bookmark from '@xero/xui-icon/icons/bookmark';

export const styles = ({ color }) => ({
	link: {
		'&, &:link, &:visited': {
			display: 'block',
			fontSize: '15px',
			lineHeight: 1.5,
			color: color.link,
			textDecoration: 'none'
		},

	},
});

const toggleChildren = function () {

};

export function LinkRenderer({ classes, children, isDocLink, ...props }) {
	return (
		<a {...props} className={isDocLink ? undefined : cx(classes.link, props.className)} onClick={toggleChildren}>
			{isDocLink && (
				<XUIIcon icon={bookmark} color="blue" className="xui-margin-right-xsmall" size="large" />
			)}
			{children}
		</a>
	);
}

LinkRenderer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	isDocLink: PropTypes.bool,
};

export default Styled(styles)(LinkRenderer);

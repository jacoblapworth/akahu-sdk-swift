import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

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

export function LinkRenderer({ classes, children, ...props }) {
	return (
		<a {...props} className={cx(classes.link, props.className)} onClick={toggleChildren}>
			{children}
		</a>
	);
}

LinkRenderer.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(LinkRenderer);

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

export const styles = ({ color }) => ({
	link: {
		'&, &:link, &:visited': {
			display: 'block',
			margin: [['1.3vh', 0, '1.3vh', 0]],
			lineHeight: 1.5,
			fontSize: 'inherit',
			color: color.link,
			textDecoration: 'none'
		},
		'&:hover, &:active': {
			isolate: false,
			color: color.linkHover,
			cursor: 'pointer',
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

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

export const styles = ({ color }) => ({
	link: {
		'&, &:link, &:visited': {
			borderBottom: '1px solid #d6dade',
			display: 'block',
			lineHeight: 1.5,
			fontSize: '15px',
			color: color.link,
			textDecoration: 'none',
			'padding-top': 'calc(1em + 0.5vh)',
			'padding-bottom': 'calc(1em + 0.5vh)',
			'padding-left': 'calc(0.7em + .7vw)'
		},
		'&:hover, &:active': {
			isolate: false,
			color: color.linkHover,
			'background-color': '#f5f6f7',
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

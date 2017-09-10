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
			paddingTop: 'calc(0.75em + 0.5vh)',
			paddingBottom: 'calc(0.75em + 0.5vh)',
			paddingLeft: 'calc(0.7em + .7vw)',
			color: color.link,
			textDecoration: 'none'
		}
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

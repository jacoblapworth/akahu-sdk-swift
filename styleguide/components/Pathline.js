import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled'; // eslint-disable-line import/no-unresolved

export const styles = ({ space, fontFamily, fontSize, color }) => ({
	pathline: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.light,
	},
	launchButton: {
		marginLeft: space[0],
	},
});

export function PathlineRenderer({ classes, children }) {
	return (
		<div className={classes.pathline}>
			{children}
		</div>
	);
}

PathlineRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string,
};

export default Styled(styles)(PathlineRenderer);

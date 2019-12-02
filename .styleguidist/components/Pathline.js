import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Styled from 'rsg-components/Styled';

export const styles = ({ space, fontFamily, fontSize, color }) => ({
  pathline: {
    fontFamily: fontFamily.monospace,
    fontSize: fontSize.small,
    color: color.light,
    marginBottom: space[2],
  },
  launchButton: {
    marginLeft: space[0],
  },
});

export function PathlineRenderer({ classes, children }) {
  return <div className={classes.pathline}>{children}</div>;
}

PathlineRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string,
};

export default Styled(styles)(PathlineRenderer);

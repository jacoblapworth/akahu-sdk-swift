import React from 'react';
import PropTypes from 'prop-types';
import Pathline from 'rsg-components/Pathline';
import Styled from 'rsg-components/Styled';

const styles = ({ space }) => ({
  root: {
    marginBottom: space[6],
  },
  tabs: {
    marginBottom: space[3],
  },
  tabButtons: {
    marginBottom: space[1],
  },
  tabBody: {
    overflowX: 'auto',
    maxWidth: '100%',
    WebkitOverflowScrolling: 'touch',
  },
});

export function ReactComponentRenderer({ classes, name, heading, pathLine, tabButtons, tabBody }) {
  return (
    <div className={classes.root} data-testid={`${name}-container`}>
      <header className={classes.header}>{heading}</header>
      {pathLine && <Pathline>{pathLine}</Pathline>}
      {tabButtons && (
        <div className={classes.tabs}>
          <div className={classes.tabButtons}>{tabButtons}</div>
          <div className={classes.tabBody}>{tabBody}</div>
        </div>
      )}
    </div>
  );
}

ReactComponentRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  heading: PropTypes.node.isRequired,
  filepath: PropTypes.string,
  pathLine: PropTypes.string,
  tabButtons: PropTypes.node,
  tabBody: PropTypes.node,
  examples: PropTypes.node,
  isolated: PropTypes.bool,
};

export default Styled(styles)(ReactComponentRenderer);

import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Styled from 'rsg-components/Styled';

const styles = ({ space, color, fontFamily, fontSize, borderRadius }) => ({
  root: {
    fontFamily: fontFamily.base,
    paddingBottom: '3.5rem', // This space is for the fixed-position version-picker at the foot of the page.
  },
  search: {
    padding: space[2],
  },
  input: {
    display: 'block',
    width: '100%',
    padding: space[1],
    color: color.base,
    backgroundColor: color.baseBackground,
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    border: [[1, color.border, 'solid']],
    borderRadius,
    transition: 'border-color ease-in-out .15s',
    '&:focus': {
      isolate: false,
      borderColor: color.link,
      outline: 0,
    },
  },
});

export function TableOfContentsRenderer({ classes, children, searchTerm, onSearchTermChange }) {
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.search}>
          <input
            aria-label="Search contents"
            className={classes.input}
            onChange={event => onSearchTermChange(event.target.value)}
            placeholder="Filter by name"
            value={searchTerm}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

TableOfContentsRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);

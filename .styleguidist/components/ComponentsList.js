import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Link from 'rsg-components/Link';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Styled from 'rsg-components/Styled';
import allSections from '../sections.json';

const styles = ({ color, fontFamily, fontSize, space }) => ({
  list: {
    margin: 0,
    padding: 0,
  },
  item: {
    color: color.base,
    backgroundColor: 'rgba(50,70,90,0.05)',
    display: 'block',
    fontFamily: fontFamily.base,
    fontSize: fontSize.base,
    listStyle: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  topLevelItem: {
    backgroundColor: '#fff',
  },
  firstChildItem: {
    fontWeight: 'bold !important',
    padding: 'none !important',
  },
  heading: {
    color: color.base,
    marginTop: space[1],
    fontFamily: fontFamily.base,
    '&, &:link, &:visited': {
      display: 'block',
      fontSize: '15px',
      lineHeight: 1.5,
      paddingTop: 'calc(0.75em + 0.5vh)',
      paddingBottom: 'calc(0.75em + 0.5vh)',
      paddingLeft: 'calc(0.7rem + .7vw)',
      color: color.light,
      textDecoration: 'none',
    },
  },
});

const matches = (item, text) => item.name === text;

/**
 * Test method to check if the parent contains the target node.
 */
const contains = (parent, target) => {
  let found = false;
  const find = node => {
    if (matches(node, target)) {
      found = true;
      return true;
    }
  };
  walkMenu(parent, find);
  return found;
};

/**
 * Walk over the passed in array and run items against the test funtction passed in.
 */
const walkMenu = (array, test) => {
  if (test(array) === true) {
    return true;
  }
  if (Array.isArray(array)) {
    const iterator = child => walkMenu(child, test);

    if (array.some(iterator)) {
      return true;
    }
  }
};

export function ComponentsListRenderer({ classes, items }) {
  items = items.filter(item => item.name);

  if (!items.length) {
    return null;
  }

  return (
    <ul className={classes.list}>
      {items.map(({ heading, name, slug, content }) =>
        heading ? (
          <li
            className={cx(classes.item, {
              [classes.topLevelItem]: contains(allSections, name),
            })}
            key={name}
          >
            <Link
              className={cx(heading && classes.heading, {
                [classes.firstChildItem]: contains(allSections[1].sections, name),
              })}
              href={`#${slug}`}
            >
              {name}
            </Link>
            {content}
          </li>
        ) : null,
      )}
    </ul>
  );
}

ComponentsListRenderer.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);

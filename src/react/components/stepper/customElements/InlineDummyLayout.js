import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { NAME_SPACE } from '../helpers/constants';

const InlineDummyLayout = ({ hasStackedButtons, tabs }) => {
  const wrapperClasses = cn(`${NAME_SPACE}-wrapper`, `${NAME_SPACE}-inline`, {
    [`${NAME_SPACE}-stacked-links`]: hasStackedButtons,
  });

  return (
    <div className={`${NAME_SPACE}-testinline`}>
      <div className={wrapperClasses}>{tabs}</div>
      {/* Rendering the content area is irrelevant as we only care about the tab alignment. */}
    </div>
  );
};

export default InlineDummyLayout;

InlineDummyLayout.propTypes = {
  hasStackedButtons: PropTypes.bool,
  tabs: PropTypes.node,
};

// To test the validity of the "inline" layout we make sure that the horizontally
// `display: flex` items do not wrap into a new line. In that regard we find the
// largest tab height and assert that it is the same size as the tabs <container />.
export const testIsInlineRelevant = rootNode => {
  const testInlineNode = rootNode.querySelector(`.${NAME_SPACE}-testinline`);
  const tabsNode = testInlineNode.querySelectorAll(`.${NAME_SPACE}-tab`);
  const wrapperHeight = testInlineNode.clientHeight;
  const tabHeights = [...tabsNode]
    .map(({ clientHeight }) => clientHeight)
    .sort()
    .reverse();
  const maxHeight = tabHeights[0] || 0;

  return maxHeight >= wrapperHeight;
};

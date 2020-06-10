import React from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

const SideBarDummyLayout = ({ gridTemplateRows, tabs }) => (
  <div className={`${NAME_SPACE}-testsidebar`}>
    <div className={`${NAME_SPACE}-wrapper ${NAME_SPACE}-sidebar`} style={{ gridTemplateRows }}>
      {tabs}
      <div className={`${NAME_SPACE}-section`} />
    </div>
  </div>
);

export default SideBarDummyLayout;

SideBarDummyLayout.propTypes = {
  gridTemplateRows: PropTypes.string,
  tabs: PropTypes.node,
};

// To test the validity of the "side bar" layout we make assert that the content
// width meets a minimum requirement.
export const testIsSideBarRelevant = rootNode => {
  const testSideBarNode = rootNode.querySelector(`.${NAME_SPACE}-testsidebar`);
  const sectionNode = testSideBarNode.querySelector(`.${NAME_SPACE}-section`);
  const minWidth = 400;
  const sectionWidth = sectionNode.clientWidth;

  return sectionWidth >= minWidth;
};

import React from 'react';
import PropTypes from 'prop-types';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import XUIDropDown from '../../dropdown/XUIDropDown';
import XUIDropDownToggled from '../../dropdown/XUIDropDownToggled';
import Picklist from '../../picklist/Picklist';
import XUIIconButton from '../../button/XUIIconButton';
import { NAME_SPACE } from '../helpers/constants';

const OverflowMenu = ({ children, overflowMenuTitle }) => {
  const createTrigger = title => (
    <XUIIconButton ariaLabel={title} icon={overflowPathData} title={title} />
  );

  const createDropDown = items => (
    <XUIDropDown>
      <Picklist>{items}</Picklist>
    </XUIDropDown>
  );

  const trigger = createTrigger(overflowMenuTitle);
  const dropdown = createDropDown(children);

  return (
    <XUIDropDownToggled
      className={`${NAME_SPACE}--overflowmenu-body`}
      dropdown={dropdown}
      isLegacyDisplay
      trigger={trigger}
    />
  );
};

export default OverflowMenu;

OverflowMenu.propTypes = {
  overflowMenuTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.bool]),
};

OverflowMenu.defaultProps = {
  children: [],
};

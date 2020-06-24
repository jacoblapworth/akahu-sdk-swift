import React from 'react';
import PropTypes from 'prop-types';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';
import Picklist from '../../picklist/Picklist';
import XUIIconButton from '../../button/XUIIconButton';
import { NAME_SPACE } from '../helpers/constants';

const OverflowMenu = ({ children, overflowMenuTitle }) => {
  const createTrigger = title => (
    <XUIIconButton ariaLabel={title} icon={overflowPathData} title={title} />
  );

  const createDropdown = items => (
    <XUIDropdown>
      <Picklist>{items}</Picklist>
    </XUIDropdown>
  );

  const trigger = createTrigger(overflowMenuTitle);
  const dropdown = createDropdown(children);

  return (
    <XUIDropdownToggled
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

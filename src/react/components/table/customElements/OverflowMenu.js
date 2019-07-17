import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import overflowPathData from '@xero/xui-icon/icons/overflow';
import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';
import Picklist from '../../picklist/Picklist';
import XUIIconButton from '../../button/XUIIconButton';
import { NAME_SPACE } from '../helpers/constants';

class OverflowMenu extends PureComponent {
  createTrigger = overflowMenuTitle => (
    <XUIIconButton
      icon={overflowPathData}
      ariaLabel={overflowMenuTitle}
      title={overflowMenuTitle}
    />
  );

  createDropDown = items => (
    <DropDown>
      <Picklist>{items}</Picklist>
    </DropDown>
  );

  render = () => {
    const { overflowMenuTitle, children } = this.props;
    const trigger = this.createTrigger(overflowMenuTitle);
    const dropdown = this.createDropDown(children);

    return (
      <DropDownToggled
        trigger={trigger}
        dropdown={dropdown}
        className={`${NAME_SPACE}--overflowmenu-body`}
        isLegacyDisplay
      />
    );
  };
}

OverflowMenu.propTypes = {
  overflowMenuTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.bool]),
};

OverflowMenu.defaultProps = {
  children: [],
};

export default OverflowMenu;

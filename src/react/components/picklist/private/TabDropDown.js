import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import DropDown from '../../dropdown/DropDown';
import DropDownToggled from '../../dropdown/DropDownToggled';

/**
 * INTERNAL USE ONLY
 *
 * This component is used internally in <Picklist> to display the
 * Tab-styled dropdown (swap from horizontal picklist).
 *
 * @param {Object} props
 */
const TabDropDown = ({ className, closeOnSelect, dropdownList, ulProps }) => {
  let tabItem = dropdownList[0];
  const dropdown = (
    <DropDown forceStatefulPicklist>
      <ul {...ulProps}>
        {React.Children.map(dropdownList, child => {
          if (child.props.isSelected) {
            tabItem = child;
          }
          return (
            child &&
            React.cloneElement(child, {
              _isHorizontal: false,
            })
          );
        })}
      </ul>
    </DropDown>
  );

  const tabSelectTrigger = React.cloneElement(tabItem, {
    id: `tabDropDownTrigger-${tabItem.props.id || 0}`,
    pickitemBodyProps: { showButtonCaret: true },
  });

  return (
    <DropDownToggled
      className={className}
      closeOnSelect={closeOnSelect}
      dropdown={dropdown}
      trigger={tabSelectTrigger}
    />
  );
};

TabDropDown.propTypes = {
  className: PropTypes.string,
  closeOnSelect: PropTypes.bool,
  dropdownList: PropTypes.array,
  ulProps: PropTypes.object,
};

export default TabDropDown;

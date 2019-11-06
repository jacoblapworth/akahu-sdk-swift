import React from 'react';
import PropTypes from 'prop-types';
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
const TabDropDown = ({ ulProps, dropdownList, className }) => {
  let tabItem = dropdownList[0];
  const dropdown = (
    <DropDown>
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

  return <DropDownToggled className={className} dropdown={dropdown} trigger={tabSelectTrigger} />;
};

TabDropDown.propTypes = {
  ulProps: PropTypes.object,
  dropdownList: PropTypes.array,
  className: PropTypes.string,
};

export default TabDropDown;

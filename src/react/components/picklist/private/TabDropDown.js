import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import XUIDropDown from '../../dropdown/XUIDropDown';
import XUIDropDownToggled from '../../dropdown/XUIDropDownToggled';

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
    <XUIDropDown>
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
    </XUIDropDown>
  );

  const tabSelectTrigger = React.cloneElement(tabItem, {
    id: `tabDropDownTrigger-${tabItem.props.id || 0}`,
    pickitemBodyProps: { showButtonCaret: true },
  });

  return (
    <XUIDropDownToggled className={className} dropdown={dropdown} trigger={tabSelectTrigger} />
  );
};

TabDropDown.propTypes = {
  ulProps: PropTypes.object,
  dropdownList: PropTypes.array,
  className: PropTypes.string,
};

export default TabDropDown;

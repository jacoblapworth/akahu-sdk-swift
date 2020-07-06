import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import XUIDropdown from '../../dropdown/XUIDropdown';
import XUIDropdownToggled from '../../dropdown/XUIDropdownToggled';

/**
 * INTERNAL USE ONLY
 *
 * This component is used internally in `XUIPicklist` to display the
 * Tab-styled dropdown (swap from horizontal picklist).
 *
 * @param {Object} props
 */
const TabDropdown = ({ ulProps, dropdownList, className }) => {
  let tabItem = dropdownList[0];
  const dropdown = (
    <XUIDropdown>
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
    </XUIDropdown>
  );

  const tabSelectTrigger = React.cloneElement(tabItem, {
    id: `tabDropdownTrigger-${tabItem.props.id || 0}`,
    pickitemBodyProps: { showButtonCaret: true },
  });

  return (
    <XUIDropdownToggled className={className} dropdown={dropdown} trigger={tabSelectTrigger} />
  );
};

TabDropdown.propTypes = {
  ulProps: PropTypes.object,
  dropdownList: PropTypes.array,
  className: PropTypes.string,
};

export default TabDropdown;

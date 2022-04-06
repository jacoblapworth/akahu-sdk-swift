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
const TabDropdown = ({ className, closeOnSelect, dropdownList, ulProps }) => {
  let tabItem = dropdownList[0];
  const triggerRef = React.useRef();

  const dropdown = (
    <XUIDropdown forceStatefulPicklist>
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
    pickitemBodyProps: { showButtonCaret: true, ref: triggerRef },
  });

  return (
    <XUIDropdownToggled
      _triggerElementRef={triggerRef.current}
      className={className}
      closeOnSelect={closeOnSelect}
      dropdown={dropdown}
      trigger={tabSelectTrigger}
    />
  );
};

TabDropdown.propTypes = {
  className: PropTypes.string,
  closeOnSelect: PropTypes.bool,
  dropdownList: PropTypes.array,
  ulProps: PropTypes.object,
};

export default TabDropdown;

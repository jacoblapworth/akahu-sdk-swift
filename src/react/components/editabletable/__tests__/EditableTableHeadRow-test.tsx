import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import EditableTableHeadRow from '../private/EditableTableHeadRow';

Enzyme.configure({ adapter: new Adapter() });

describe('EditableTableHeadRow', () => {
  it('renders correctly', () => {
    // Arrange
    const wrapper = shallow(<EditableTableHeadRow />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with children, qaHook, and spreadprops', () => {
    // Arrange
    const wrapper = shallow(
      <EditableTableHeadRow className="test-classname" qaHook="test-qaHook">
        <td>Test content</td>
      </EditableTableHeadRow>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders utility control columns, if applicable', () => {
    // Arrange
    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: { isDraggable: true, isRemovable: true } }}
      >
        <table>
          <thead>
            <EditableTableHeadRow />
          </thead>
        </table>
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

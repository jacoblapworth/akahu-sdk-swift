import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import EditableTableColGroup from '../private/EditableTableColGroup';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('EditableTableColGroup', () => {
  it('renders correctly', () => {
    // Arrange
    const wrapper = shallow(<EditableTableColGroup columnWidths={['100px', '100px']} />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('returns null if no colWidths are provided', () => {
    // Arrange
    const wrapper = shallow(<EditableTableColGroup />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('includes row control columns, if necessary', () => {
    // Arrange
    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: { isDraggable: true, isRemovable: true } }}
      >
        <table>
          <EditableTableColGroup columnWidths={['100px', '100px']} />
        </table>
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <EditableTableColGroup columnWidths={['100px', '100px']} />
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

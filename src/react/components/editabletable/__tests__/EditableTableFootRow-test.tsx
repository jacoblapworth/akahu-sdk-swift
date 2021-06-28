import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import EditableTableFootRow from '../private/EditableTableFootRow';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('EditableTableFootRow', () => {
  it('renders correctly', () => {
    // Arrange
    const wrapper = shallow(<EditableTableFootRow />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with children, qaHook, and spreadprops', () => {
    // Arrange
    const wrapper = shallow(
      <EditableTableFootRow className="test-classname" qaHook="test-qaHook">
        <td>Test content</td>
      </EditableTableFootRow>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders utility control columns, if applicable', () => {
    // Arrange
    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{
          dragAndDrop: {},
          rowOptions: { isDraggable: true, isRemovable: true },
        }}
      >
        <table>
          <tfoot>
            <EditableTableFootRow />
          </tfoot>
        </table>
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tfoot>
          <EditableTableFootRow />
        </tfoot>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

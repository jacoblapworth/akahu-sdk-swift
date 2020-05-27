import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableCellControl from '../XUIEditableTableCellControl';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellControl />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellControl>XUIEditableTableCellControl</XUIEditableTableCellControl>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellControl className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('validation message', () => {
    it('renders when the input is invalid and there is a validation message', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellControl isInvalid validationMessage="Error message" />
            </tr>
          </tbody>
        </table>,
      );

      expect(wrapper.text()).toContain('Error message');
    });

    it('does not render if there is no validation message', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellControl isInvalid />
            </tr>
          </tbody>
        </table>,
      );

      expect(wrapper.text()).not.toContain('Error message');
    });

    it('does not mount if the cell is valid', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellControl validationMessage="Error message" />
            </tr>
          </tbody>
        </table>,
      );

      expect(wrapper.text()).not.toContain('Error message');
    });
  });
});
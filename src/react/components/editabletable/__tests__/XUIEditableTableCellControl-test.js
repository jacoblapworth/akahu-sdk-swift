import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUIEditableTableCellControl from '../XUIEditableTableCellControl';
import PortalFocus from '../private/PortalFocus';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

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

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellControl>XUIEditableTableCellControl</XUIEditableTableCellControl>
          </tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
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

  describe('is focused', () => {
    it('renders with the portal focus ring', () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellControl isFocused />
            </tr>
          </tbody>
        </table>,
      );

      expect(wrapper.find(PortalFocus).length).toBe(1);
    });
  });
});

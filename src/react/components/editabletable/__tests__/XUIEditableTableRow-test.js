import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTable from '../XUIEditableTable';
import XUIEditableTableRow from '../XUIEditableTableRow';
import XUIEditableTableBody from '../XUIEditableTableBody';
import XUIEditableTableHead from '../XUIEditableTableHead';
import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableRow />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableRow>
        <div>XUIEditableTableRow</div>
      </XUIEditableTableRow>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableRow className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('removable row', () => {
    it('renders a remove button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow removeButtonAriaLabel="Remove row" qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-remove"]').length).toBe(1);
    });

    it('renders a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true }}>
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(1);
    });

    it('calls the onRemove callback when the remove button is clicked', () => {
      // Arrange
      const onRemoveMock = jest.fn();
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: true }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow
              removeButtonAriaLabel="Remove row"
              onRemove={onRemoveMock}
              qaHook="test-row"
            />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Act
      wrapper.find('[data-automationid="test-row--button-remove"]').simulate('click');

      // Assert
      expect(onRemoveMock).toBeCalled();
    });
  });

  describe('non-removable row', () => {
    it('does not render a remove button for rows in the body', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: false }}>
          <XUIEditableTableBody>
            <XUIEditableTableRow removeButtonAriaLabel="Remove row" qaHook="test-row" />
          </XUIEditableTableBody>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find('[data-automationid="test-row--button-remove"]').length).toBe(0);
    });

    it('does not render a blank table cell for rows in the head', () => {
      // Arrange
      const wrapper = mount(
        <XUIEditableTable rowOptions={{ isRemovable: false }}>
          <XUIEditableTableHead>
            <XUIEditableTableRow qaHook="test-row" />
          </XUIEditableTableHead>
        </XUIEditableTable>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableHeadingCell).length).toBe(0);
    });
  });
});

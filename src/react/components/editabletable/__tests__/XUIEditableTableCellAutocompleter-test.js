import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { v4 as uuidv4 } from 'uuid';

import XUIAutocompleter from '../../autocompleter/XUIAutocompleter';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellControl from '../XUIEditableTableCellControl';
import XUIEditableTableCellAutocompleter from '../XUIEditableTableCellAutocompleter';

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellAutocompleter />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellAutocompleter onSearch={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('focusing', () => {
    it('lets XUIEditableTableCellControl know when the input is focused', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('input').simulate('focus');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input is blurred', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('input').simulate('focus');
      wrapper.find('input').simulate('blur');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeFalsy();
    });

    it('lets XUIEditableTableCellControl know when the input is disabled', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} isDisabled />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isDisabled')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input is invalid', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter onSearch={() => {}} isInvalid />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isInvalid')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the input has a validation message', () => {
      // Arrange
      const expectedMessage = 'Test validation message';
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellAutocompleter
                onSearch={() => {}}
                validationMessage={expectedMessage}
              />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('validationMessage')).toBe(
        expectedMessage,
      );
    });
  });

  it('spreads cellProps onto the table cell', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter cellProps={{ width: '100px' }} onSearch={() => {}} />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIEditableTableCell).getDOMNode().getAttribute('width')).toBe('100px');
  });

  it('spreads the rest of the props onto XUIEditableTableCellAutocompleter', () => {
    const spreadProps = {
      id: 'testId',
      onSearch: () => {},
      isDisabled: true,
    };

    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter {...spreadProps} />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIAutocompleter).props()).toMatchObject(spreadProps);
  });

  it('fires the onOpen and onClose handlers when the top-level methods are fired', () => {
    const onOpenMock = jest.fn();
    const onCloseMock = jest.fn();
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              onClose={onCloseMock}
              onOpen={onOpenMock}
              onSearch={() => {}}
            />
          </tr>
        </tbody>
      </table>,
    );

    const cellAuto = wrapper.find(XUIEditableTableCellAutocompleter);
    cellAuto.instance().openDropdown();
    expect(onOpenMock).toHaveBeenCalledTimes(1);

    cellAuto.instance().closeDropdown();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
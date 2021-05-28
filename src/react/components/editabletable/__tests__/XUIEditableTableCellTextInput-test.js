import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';

import XUITextInput from '../../textinput/XUITextInput';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellControl from '../XUIEditableTableCellControl';
import XUIEditableTableCellTextInput from '../XUIEditableTableCellTextInput';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testGeneratedId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIEditableTableCellTextInput />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellTextInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellTextInput label="Text input cell" />
          </tr>
        </tbody>
      </table>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('focusing', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    it('selects the whole input when focused', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput defaultValue="a long input value" isMultiline />
              <XUIEditableTableCellTextInput defaultValue="input value" />
            </tr>
          </tbody>
        </table>,
      );
      const textareaSpy = jest.spyOn(wrapper.find('textarea').instance(), 'select');
      const inputSpy = jest.spyOn(wrapper.find('input').instance(), 'select');

      // Act
      wrapper.find('textarea').simulate('focus');
      wrapper.find('input').simulate('focus');
      jest.runAllTimers();
      // Assert
      expect(textareaSpy).toBeCalledTimes(1);
      expect(inputSpy).toBeCalledTimes(1);
    });

    it('lets XUIEditableTableCellControl know when the input is focused', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput />
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
              <XUIEditableTableCellTextInput />
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
              <XUIEditableTableCellTextInput isDisabled />
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
              <XUIEditableTableCellTextInput isInvalid />
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
              <XUIEditableTableCellTextInput validationMessage={expectedMessage} />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('validationMessage')).toBe(
        expectedMessage,
      );
    });

    it('input text is selected before the onFocus prop is called', () => {
      // Arrange
      const onFocusMock = jest.fn();
      const inputValue = 'Highlight Highlight Highlight';
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput
                onChange={() => {}}
                onFocus={onFocusMock}
                value={inputValue}
              />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('input').simulate('focus');
      jest.runAllTimers();
      const onFocusArguments = onFocusMock.mock.calls[0];
      const focusTarget = onFocusArguments[0].target;
      const selectedText = focusTarget.value.substring(
        focusTarget.selectionStart,
        focusTarget.selectionEnd,
      );

      // Assert
      expect(selectedText).toBe(inputValue);
    });
  });

  describe('spreading props', () => {
    it('spreads cellProps onto the table cell', () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput cellProps={{ width: '50px' }} />
            </tr>
          </tbody>
        </table>,
      );
      expect(wrapper.find(XUIEditableTableCell).getDOMNode().getAttribute('width')).toBe('50px');
    });

    it('spreads the rest of the props onto XUITextInput', () => {
      const spreadProps = {
        id: 'testId',
        isDisabled: true,
      };

      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput {...spreadProps} />
            </tr>
          </tbody>
        </table>,
      );
      expect(wrapper.find(XUITextInput).props()).toMatchObject(spreadProps);
    });
  });
});

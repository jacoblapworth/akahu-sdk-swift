import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SelectBox, { SelectBoxOption } from '../../../select-box';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellControl from '../XUIEditableTableCellControl';
import XUIEditableTableCellSelectBox from '../XUIEditableTableCellSelectBox';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellSelectBox />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellSelectBox
        buttonContent="EditableTable select box"
        label="EditableTable select box"
      >
        <SelectBoxOption id="a" key="a" value="Apple">
          Apple
        </SelectBoxOption>
        <SelectBoxOption id="b" key="b" value="Banana">
          Banana
        </SelectBoxOption>
        <SelectBoxOption id="c" key="c" value="Cucumber">
          Cucumber
        </SelectBoxOption>
      </XUIEditableTableCellSelectBox>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('focusing', () => {
    it('lets XUIEditableTableCellControl know when the select box is focused', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellSelectBox buttonContent="Test button" label="Test select box" />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('button').simulate('focus');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the select box is blurred', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellSelectBox buttonContent="Test button" label="Test select box" />
            </tr>
          </tbody>
        </table>,
      );

      // Act
      wrapper.find('button').simulate('focus');
      wrapper.find('button').simulate('blur');

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isFocused')).toBeFalsy();
    });

    it('lets XUIEditableTableCellControl know when the select box is disabled', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellSelectBox
                buttonContent="Test button"
                label="Test select box"
                isDisabled
              />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isDisabled')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the select box is invalid', () => {
      // Arrange
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellSelectBox
                buttonContent="Test button"
                label="Test select box"
                isInvalid
              />
            </tr>
          </tbody>
        </table>,
      );

      // Assert
      expect(wrapper.find(XUIEditableTableCellControl).prop('isInvalid')).toBeTruthy();
    });

    it('lets XUIEditableTableCellControl know when the select box has a validation message', () => {
      // Arrange
      const expectedMessage = 'Test validation message';
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellSelectBox
                buttonContent="Test button"
                label="Test select box"
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
            <XUIEditableTableCellSelectBox
              buttonContent="EditableTable select box"
              label="EditableTable select box"
              cellProps={{ width: '100px' }}
            >
              <SelectBoxOption id="a" key="a" value="Apple">
                Apple
              </SelectBoxOption>
              <SelectBoxOption id="b" key="b" value="Banana">
                Banana
              </SelectBoxOption>
              <SelectBoxOption id="c" key="c" value="Cucumber">
                Cucumber
              </SelectBoxOption>
            </XUIEditableTableCellSelectBox>
          </tr>
        </tbody>
      </table>,
    );
    expect(
      wrapper
        .find(XUIEditableTableCell)
        .getDOMNode()
        .getAttribute('width'),
    ).toBe('100px');
  });

  it('spreads the rest of the props onto SelectBox', () => {
    const spreadProps = {
      buttonContent: 'EditableTable select box',
      label: 'EditableTable select box',
      id: 'testId',
      isDisabled: true,
    };

    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellSelectBox {...spreadProps}>
              <SelectBoxOption id="a" key="a" value="Apple">
                Apple
              </SelectBoxOption>
              <SelectBoxOption id="b" key="b" value="Banana">
                Banana
              </SelectBoxOption>
              <SelectBoxOption id="c" key="c" value="Cucumber">
                Cucumber
              </SelectBoxOption>
            </XUIEditableTableCellSelectBox>
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(SelectBox).props()).toMatchObject(spreadProps);
  });
});

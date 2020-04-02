import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import SelectBox, { SelectBoxOption } from '../../../select-box';
import XUIEditableTableCell from '../XUIEditableTableCell';
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
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellSelectBox
              buttonContent="EditableTable select box"
              label="EditableTable select box"
              id="testId"
              isDisabled
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
    expect(wrapper.find(SelectBox).props().id).toBe('testId');
    expect(wrapper.find(SelectBox).props().isDisabled).toBe(true);
  });
});

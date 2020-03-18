import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUITextInput from '../../textInput/XUITextInput';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellTextInput from '../XUIEditableTableCellTextInput';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellTextInput />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellTextInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
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
      expect(
        wrapper
          .find(XUIEditableTableCell)
          .getDOMNode()
          .getAttribute('width'),
      ).toBe('50px');
    });

    it('spreads the rest of the props onto XUITextInput', () => {
      const wrapper = mount(
        <table>
          <tbody>
            <tr>
              <XUIEditableTableCellTextInput id="testId" />
            </tr>
          </tbody>
        </table>,
      );
      expect(wrapper.find(XUITextInput).props().id).toBe('testId');
    });
  });
});

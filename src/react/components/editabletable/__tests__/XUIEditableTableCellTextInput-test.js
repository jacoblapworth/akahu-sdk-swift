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

  it('renders with cellProps', () => {
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

  it('renders with spread props of text input', () => {
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

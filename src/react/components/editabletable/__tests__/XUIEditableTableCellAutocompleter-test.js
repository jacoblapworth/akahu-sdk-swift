import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIAutocompleter from '../../autocompleter/XUIAutocompleter';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellAutocompleter from '../XUIEditableTableCellAutocompleter';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellAutocompleter />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellAutocompleter
        onSearch={() => {}}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('spreads cellProps onto the table cell', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              cellProps={{ width:'100px' }}
              onSearch={() => {}}
            />
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

  it('spreads the rest of the props onto XUIEditableTableCellAutocompleter', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellAutocompleter
              id="testId"
              onSearch={() => {}}
            />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIAutocompleter).props().id).toBe('testId');
  });
});

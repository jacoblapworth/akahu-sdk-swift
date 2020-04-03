import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIButton from '../../button/XUIButton';
import XUIAutocompleterSecondarySearch from '../../autocompleter/XUIAutocompleterSecondarySearch';
import XUIEditableTableCell from '../XUIEditableTableCell';
import XUIEditableTableCellSecondarySearch from '../XUIEditableTableCellSecondarySearch';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCellSecondarySearch />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellSecondarySearch
        onSearch={() => {}}
        trigger={<XUIButton>Click me</XUIButton>}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('spreads cellProps onto the table cell', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellSecondarySearch
              cellProps={{ width: '100px' }}
              onSearch={() => {}}
              trigger={<XUIButton>Click me</XUIButton>}
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

  it('spreads the rest of the props onto XUIAutocompleterSecondarySearch', () => {
    const spreadProps = {
      id: 'testId',
      onSearch: () => {},
      trigger: <XUIButton>Click me</XUIButton>,
    };

    const wrapper = mount(
      <table>
        <tbody>
          <tr>
            <XUIEditableTableCellSecondarySearch {...spreadProps} />
          </tr>
        </tbody>
      </table>,
    );
    expect(wrapper.find(XUIAutocompleterSecondarySearch).props()).toMatchObject(spreadProps);
  });
});

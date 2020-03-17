import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableCellReadOnly from '../XUIEditableTableCellReadOnly';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableCellReadOnly>XUIEditableTableCellReadOnly</XUIEditableTableCellReadOnly>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableCellReadOnly className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

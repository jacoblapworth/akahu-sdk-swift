import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTable from '../XUIEditableTable';
import XUIEditableTableRow from '../XUIEditableTableRow';

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
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableHead from '../XUIEditableTableHead';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableHead />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableHead>
        <div>XUIEditableTableHead</div>
      </XUIEditableTableHead>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableHead className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

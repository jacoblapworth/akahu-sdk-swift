import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import EditableTableUtilityBar from '../private/EditableTableUtilityBar';

Enzyme.configure({ adapter: new Adapter() });

describe('<EditableTableUtilityBar />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<EditableTableUtilityBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<EditableTableUtilityBar className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

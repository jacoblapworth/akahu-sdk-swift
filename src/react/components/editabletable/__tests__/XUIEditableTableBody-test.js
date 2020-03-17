import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableBody from '../XUIEditableTableBody';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableBody />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableBody>
        <div>XUIEditableTableBody</div>
      </XUIEditableTableBody>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableBody className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

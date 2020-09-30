import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableFoot from '../XUIEditableTableFoot';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableFoot />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableFoot>
        <div>XUIEditableTableFoot</div>
      </XUIEditableTableFoot>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableFoot className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

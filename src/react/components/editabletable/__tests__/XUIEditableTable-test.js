import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTable from '../XUIEditableTable';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTable />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTable>
        <div>XUIEditableTable</div>
      </XUIEditableTable>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTable className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with the caption', () => {
    const wrapper = shallow(<XUIEditableTable caption="An editable table" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

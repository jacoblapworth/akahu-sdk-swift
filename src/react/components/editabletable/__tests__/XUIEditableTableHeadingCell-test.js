import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableHeadingCell from '../XUIEditableTableHeadingCell';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableHeadingCell>XUIEditableTableHeadingCell</XUIEditableTableHeadingCell>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render with customized scope', () => {
    const wrapper = shallow(<XUIEditableTableHeadingCell scope="rowGroup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

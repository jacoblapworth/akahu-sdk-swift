import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTable from '../XUIEditableTable';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTable />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<XUIEditableTable />);
    expect(wrapper).toMatchSnapshot();
  });
});

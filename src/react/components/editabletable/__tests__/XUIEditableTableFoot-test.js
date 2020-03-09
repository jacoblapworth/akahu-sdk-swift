import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTableFoot from '../XUIEditableTableFoot';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableFoot />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
      <XUIEditableTableFoot>XUIEditableTableFoot</XUIEditableTableFoot>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableFoot className="test-classname" />);
    expect(wrapper).toMatchSnapshot();
  });
});

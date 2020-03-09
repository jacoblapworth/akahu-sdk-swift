import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTableBody from '../XUIEditableTableBody';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableBody />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
      <XUIEditableTableBody>XUIEditableTableBody</XUIEditableTableBody>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableBody className="test-classname" />);
    expect(wrapper).toMatchSnapshot();
  });
});

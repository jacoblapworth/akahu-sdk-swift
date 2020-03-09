import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTableRow from '../XUIEditableTableRow';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableRow />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableRow>XUIEditableTableRow</XUIEditableTableRow>);
    expect(wrapper).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableRow className="test-classname" />);
    expect(wrapper).toMatchSnapshot();
  });
});

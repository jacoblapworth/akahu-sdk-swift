import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTableCell from '../XUIEditableTableCell';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableCell />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
      <XUIEditableTableCell>XUIEditableTableCell</XUIEditableTableCell>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableCell className="test-classname" />);
    expect(wrapper).toMatchSnapshot();
  });
});

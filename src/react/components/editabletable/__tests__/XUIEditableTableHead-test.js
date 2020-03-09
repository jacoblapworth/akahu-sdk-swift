import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIEditableTableHead from '../XUIEditableTableHead';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableHead />', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(
      <XUIEditableTableHead>
        <div>XUIEditableTableHead</div>
      </XUIEditableTableHead>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = renderer.create(<XUIEditableTableHead className="test-classname" />);
    expect(wrapper).toMatchSnapshot();
  });
});

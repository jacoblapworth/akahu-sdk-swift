import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import React from 'react';

import XUIPopoverBody from '../XUIPopoverBody';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIPopoverBody />', () => {
  it('renders without crashing', () => {
    // Arrange
    const wrapper = mount(<XUIPopoverBody>XUIPopoverBody</XUIPopoverBody>);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

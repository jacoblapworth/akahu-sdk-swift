import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import toJson from 'enzyme-to-json';
import React from 'react';

import XUIPopoverBody from '../XUIPopoverBody';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPopoverBody />', () => {
  it('renders without crashing', () => {
    // Arrange
    const wrapper = mount(<XUIPopoverBody>XUIPopoverBody</XUIPopoverBody>);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIPopoverBody>XUIPopoverBody</XUIPopoverBody>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

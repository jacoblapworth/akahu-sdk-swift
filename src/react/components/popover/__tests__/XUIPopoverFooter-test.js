import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import toJson from 'enzyme-to-json';
import React from 'react';

import XUIButton from '../../button/XUIButton';
import XUIPopoverFooter from '../XUIPopoverFooter';
import XUIActions from '../../../actions';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPopoverFooter />', () => {
  it('renders without crashing', () => {
    // Arrange
    const wrapper = shallow(
      <XUIPopoverFooter
        primaryAction={<XUIButton variant="main">Primary action</XUIButton>}
        secondaryAction={<XUIButton>Secondary action</XUIButton>}
      />,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('sets isLinear to true on XUIActions when a primary and secondary action are provided', () => {
    // Arrange
    const wrapper = shallow(
      <XUIPopoverFooter
        primaryAction={<XUIButton variant="main">Primary action</XUIButton>}
        secondaryAction={<XUIButton>Secondary action</XUIButton>}
      />,
    );

    // Assert
    expect(wrapper.find(XUIActions).prop('isLinear')).toBe(true);
  });

  it('sets isLinear to false on XUIActions when no secondary action is provided', () => {
    // Arrange
    const wrapper = shallow(
      <XUIPopoverFooter primaryAction={<XUIButton variant="main">Primary action</XUIButton>} />,
    );

    // Assert
    expect(wrapper.find(XUIActions).prop('isLinear')).toBe(false);
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIPopoverFooter
        primaryAction={<XUIButton variant="main">Primary action</XUIButton>}
        secondaryAction={<XUIButton>Secondary action</XUIButton>}
      />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

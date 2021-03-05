import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import toJson from 'enzyme-to-json';
import React from 'react';

import XUIPopoverHeader from '../XUIPopoverHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPopoverHeader />', () => {
  it('renders without crashing', () => {
    // Arrange
    const wrapper = mount(
      <XUIPopoverHeader
        closeButtonProps={{ ariaLabel: 'Close' }}
        subtitle="Subtitle"
        title="Test title"
      />,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls onClose when the close button is clicked', () => {
    // Arrange
    const onCloseMock = jest.fn();
    const wrapper = mount(
      <XUIPopoverHeader
        closeButtonProps={{ ariaLabel: 'Close' }}
        onClose={onCloseMock}
        qaHook="popover-head"
        subtitle="Subtitle"
        title="Test title"
      />,
    );

    // Act
    wrapper.find('[data-automationid="popover-head--close"]').simulate('click');

    // Assert
    expect(onCloseMock).toBeCalled();
  });

  it('calls closeButtonProps.onClick when the close button is clicked', () => {
    // Arrange
    const onCloseMock = jest.fn();
    const wrapper = mount(
      <XUIPopoverHeader
        closeButtonProps={{ ariaLabel: 'Close', onClick: onCloseMock }}
        onClose={onCloseMock}
        qaHook="popover-head"
        subtitle="Subtitle"
        title="Test title"
      />,
    );

    // Act
    wrapper.find('[data-automationid="popover-head--close"]').simulate('click');

    // Assert
    expect(onCloseMock).toBeCalled();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIPopoverHeader
        closeButtonProps={{ ariaLabel: 'Close' }}
        subtitle="Subtitle"
        title="Test title"
      />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

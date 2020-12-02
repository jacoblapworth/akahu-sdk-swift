import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIDropdownPanel from '../XUIDropdownPanel';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIDropdownPanel /> onScroll method', () => {
  it('calls the onScroll callback when the dropdown scrollable content is scrolled', () => {
    // Arrange
    const onScroll = jest.fn();

    const dropdownPanel = mount(
      <XUIDropdownPanel onScroll={onScroll} qaHook="scroll-test">
        <h1>Scroll me</h1>
      </XUIDropdownPanel>,
    );

    // Act
    dropdownPanel.find('[data-automationid="scroll-test--scrollable-content"]').simulate('scroll');

    // Assert
    expect(onScroll).toBeCalled();
  });
});

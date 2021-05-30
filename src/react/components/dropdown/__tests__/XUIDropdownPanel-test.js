import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIDropdownPanel from '../XUIDropdownPanel';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

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

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIDropdownPanel>
        <h1>Meow</h1>
      </XUIDropdownPanel>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it('should pass accessibility testing when rendering a picklist inside the panel', async () => {
    const wrapper = mount(
      <XUIDropdownPanel>
        <XUIPicklist ariaLabel="Select option">
          <XUIPickitem id="option1">Option 1</XUIPickitem>
        </XUIPicklist>
      </XUIDropdownPanel>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

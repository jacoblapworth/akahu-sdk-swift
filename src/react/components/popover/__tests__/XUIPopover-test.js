import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Positioning from '../private/Positioning';
import XUIPopover from '../XUIPopover';
import XUIPopoverHeader from '../XUIPopoverHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUIPopover />', () => {
  it('renders without crashing', () => {
    // Arrange
    const triggerRef = React.createRef();
    const wrapper = mount(<XUIPopover id="test-popover" triggerRef={triggerRef} />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders custom widths correctly', () => {
    // Arrange
    const triggerRef = React.createRef();
    const wrapper = mount(
      <XUIPopover id="test-popover" qaHook="test-popover" triggerRef={triggerRef} width={500} />,
    );

    // Act
    const popoverWidth = window
      .getComputedStyle(wrapper.find('[data-automationid="test-popover"]').getDOMNode())
      .getPropertyValue('max-width');

    // Assert
    expect(popoverWidth).toBe('500px');
  });

  it('calls onClickOutside when a click event occurs outside the popover', () => {
    // Arrange
    const onClickOutsideMock = jest.fn();
    const triggerRef = React.createRef();
    mount(
      <XUIPopover id="test-popover" onClickOutside={onClickOutsideMock} triggerRef={triggerRef} />,
    );

    // Act
    const clickEvent = new MouseEvent('click');
    document.dispatchEvent(clickEvent);

    // Assert
    expect(onClickOutsideMock).toHaveBeenCalled();
  });

  it('closing the popover from within the popover returns the focus to the trigger', () => {
    // Arrange
    const triggerFocusMock = jest.fn();
    const closeButtonRef = React.createRef();
    const triggerRef = React.createRef();
    const { rerender } = render(
      <>
        <button ref={triggerRef} type="button" />
        <XUIPopover id="test-popover" triggerRef={triggerRef}>
          <button ref={closeButtonRef} type="button" />
        </XUIPopover>
      </>,
    );
    triggerRef.current.addEventListener('focus', triggerFocusMock);

    // Act
    userEvent.click(closeButtonRef.current);
    rerender(
      <>
        <button ref={triggerRef} type="button" />
      </>,
    );

    // Assert
    expect(triggerFocusMock).toHaveBeenCalled();
  });

  it('closing the popover from outside the popover does not return the focus to the trigger', () => {
    // Arrange
    const triggerFocusMock = jest.fn();
    const trigger = document.createElement('button');
    const triggerRef = { current: trigger };
    triggerRef.current.addEventListener('focus', triggerFocusMock);
    const wrapper = mount(<XUIPopover id="test-popover" triggerRef={triggerRef} />);

    // Act
    wrapper.instance().componentWillUnmount();

    // Assert
    expect(triggerFocusMock).not.toHaveBeenCalled();
  });

  it.skip('should pass accessibility testing', async () => {
    const triggerRef = React.createRef();
    const wrapper = mount(<XUIPopover id="test-popover" triggerRef={triggerRef} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  describe('triggerRef', () => {
    it('proxies the rootNode callback ref of class components', () => {
      // Arrange
      const trigger = document.createElement('button');
      const triggerClassComponent = { rootNode: trigger };
      const triggerRef = { current: triggerClassComponent };
      const wrapper = mount(<XUIPopover id="test-popover" triggerRef={triggerRef} />);

      // Assert
      expect(wrapper.find(Positioning).first().props().triggerRef.current).toBe(trigger);
    });

    it('proxies the rootNode ref object of class components', () => {
      // Arrange
      const trigger = document.createElement('button');
      const triggerClassComponent = { rootNode: { current: trigger } };
      const triggerRef = { current: triggerClassComponent };
      const wrapper = mount(<XUIPopover id="test-popover" triggerRef={triggerRef} />);

      // Assert
      expect(wrapper.find(Positioning).first().props().triggerRef.current).toBe(trigger);
    });
  });

  describe('aria-labelledby', () => {
    it('gets applied when there is a XUIPopoverHeader child', () => {
      // Arrange
      const triggerRef = React.createRef();
      const wrapper = mount(
        <XUIPopover id="test-popover" qaHook="test-popover" triggerRef={triggerRef}>
          <XUIPopoverHeader closeButtonProps={{ ariaLabel: 'Close' }} title="Test Popover" />
        </XUIPopover>,
      );

      // Act
      const labelledby = wrapper.find('[data-automationid="test-popover"]').prop('aria-labelledby');

      // Assert
      expect(labelledby).toBe('test-popover-title');
    });

    it('does not get applied when there is no XUIPopoverHeader child', () => {
      // Arrange
      const triggerRef = React.createRef();
      const wrapper = mount(
        <XUIPopover id="test-popover" qaHook="test-popover" triggerRef={triggerRef} />,
      );

      // Act
      const labelledby = wrapper.find('[data-automationid="test-popover"]').prop('aria-labelledby');

      // Assert
      expect(labelledby).toBeUndefined();
    });
  });
});

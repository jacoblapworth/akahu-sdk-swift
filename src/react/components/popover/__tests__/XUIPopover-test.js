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

  test('onClickOutside is called when a click event occurs outside the popover', () => {
    // Arrange
    const onClickOutsideMock = jest.fn();
    const triggerRef = React.createRef();
    render(
      <>
        <button ref={triggerRef} />
        <XUIPopover id="test-popover" onClickOutside={onClickOutsideMock} triggerRef={triggerRef} />
      </>,
    );

    // Act
    userEvent.click(document.documentElement);

    // Assert
    expect(onClickOutsideMock).toHaveBeenCalled();
  });

  test('onClickOutside is not called when a click event occurs inside the popover', () => {
    // Arrange
    const onClickOutsideMock = jest.fn();
    const triggerRef = React.createRef();
    render(
      <XUIPopover id="test-popover" onClickOutside={onClickOutsideMock} triggerRef={triggerRef}>
        Inside the popover
      </XUIPopover>,
    );

    // Act
    userEvent.click(screen.getByText('Inside the popover'));

    // Assert
    expect(onClickOutsideMock).not.toHaveBeenCalled();
  });

  test('onClickOutside is not called when a click event occurs inside the trigger', () => {
    // Arrange
    const onClickOutsideMock = jest.fn();
    const triggerRef = React.createRef();
    render(
      <>
        <button data-automationid="test-trigger" ref={triggerRef} />
        <XUIPopover id="test-popover" onClickOutside={onClickOutsideMock} triggerRef={triggerRef} />
      </>,
    );

    // Act
    userEvent.click(screen.getByTestId('test-trigger'));

    // Assert
    expect(onClickOutsideMock).not.toHaveBeenCalled();
  });

  test('closing the popover from within the popover returns the focus to the trigger', () => {
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

  describe('Escape Key Pressed', () => {
    test('onClickOutside is called when escape key is pressed', () => {
      // Arrange
      const onClickOutsideMock = jest.fn();
      const triggerRef = React.createRef();
      render(
        <>
          <button ref={triggerRef} />
          <XUIPopover
            id="test-popover"
            onClickOutside={onClickOutsideMock}
            triggerRef={triggerRef}
          />
        </>,
      );

      // Act
      userEvent.keyboard('{esc}');

      // Assert
      expect(onClickOutsideMock).toHaveBeenCalled();
    });

    test('onClickCloseButton is called when escape key is pressed inside the popover', () => {
      // Arrange
      const onClickCloseButtonMock = jest.fn();
      const triggerRef = React.createRef();
      render(
        <XUIPopover
          id="test-popover"
          onClickCloseButton={onClickCloseButtonMock}
          triggerRef={triggerRef}
        >
          Inside the popover
        </XUIPopover>,
      );

      // Act
      userEvent.click(screen.getByText('Inside the popover'));
      userEvent.keyboard('{esc}');

      // Assert
      expect(onClickCloseButtonMock).toHaveBeenCalled();
    });

    test('onClickCloseButton is called when escape key is pressed inside the trigger', () => {
      // Arrange
      const onClickCloseButtonMock = jest.fn();
      const triggerRef = React.createRef();
      render(
        <>
          <button ref={triggerRef} data-automationid={'trigger'}>trigger button</button>
          <XUIPopover
            id="test-popover"
            onClickCloseButton={onClickCloseButtonMock}
            triggerRef={triggerRef}
          >
            Inside the popover
          </XUIPopover>
        </>,
      );

      // Act
      userEvent.click(screen.getByTestId('trigger'));
      userEvent.keyboard('{esc}');

      // Assert
      expect(onClickCloseButtonMock).toHaveBeenCalled();
    });

    test('onClickCloseButton is not called when escape key is pressed outside the popover', () => {
      // Arrange
      const onClickCloseButtonMock = jest.fn();
      const triggerRef = React.createRef();
      render(
        <XUIPopover
          id="test-popover"
          onClickCloseButton={onClickCloseButtonMock}
          triggerRef={triggerRef}
        >
          Inside the popover
        </XUIPopover>,
      );

      // Act
      userEvent.keyboard('{esc}');

      // Assert
      expect(onClickCloseButtonMock).not.toHaveBeenCalled();
    });
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

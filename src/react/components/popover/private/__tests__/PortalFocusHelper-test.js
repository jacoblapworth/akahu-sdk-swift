import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import React from 'react';

import PortalFocusHelper from '../PortalFocusHelper';

Enzyme.configure({ adapter: new Adapter() });

describe('<PortalFocusHelper />', () => {
  it('renders without crashing', () => {
    // Arrange
    const focusPortalRef = React.createRef();
    const wrapper = shallow(<PortalFocusHelper focusPortalRef={focusPortalRef} />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('focus elements', () => {
    it('sends the focus to the first element on the page if the focus comes from the end of the page', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const firstElementRef = React.createRef();
      const focusPortalRef = React.createRef();
      const wrapper = mount(
        <>
          <button ref={firstElementRef} type="button" />
          <button ref={focusPortalRef} type="button" />
          <button type="button" />
          <PortalFocusHelper focusPortalRef={focusPortalRef} />
        </>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      wrapper.find('div').first().simulate('focus');

      // Assert
      expect(document.activeElement).toBe(firstElementRef.current);

      // Cleanup
      document.body.innerHTML = '';
    });

    it('returns the focus to the page when shift+tabbing out of the popover', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const focusPortalRef = React.createRef();
      const wrapper = mount(
        <>
          <button type="button" />
          <button ref={focusPortalRef} type="button" />
          <button type="button" />
          <PortalFocusHelper focusPortalRef={focusPortalRef} />
        </>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      wrapper.find('div').at(1).simulate('focus');

      // Assert
      expect(document.activeElement).toBe(focusPortalRef.current);

      // Cleanup
      document.body.innerHTML = '';
    });

    it('returns the focus to the page when tabbing out of the popover', () => {
      // Setup
      document.body.innerHTML = '<div></div>';

      // Arrange
      const expectedFocusRef = React.createRef();
      const focusPortalRef = React.createRef();
      const wrapper = mount(
        <>
          <button type="button" />
          <button ref={focusPortalRef} type="button" />
          <button ref={expectedFocusRef} type="button" />
          <PortalFocusHelper focusPortalRef={focusPortalRef} />
        </>,
        { attachTo: document.body.querySelector('div') },
      );

      // Act
      wrapper.find('div').last().simulate('focus');

      // Assert
      expect(document.activeElement).toBe(expectedFocusRef.current);

      // Cleanup
      document.body.innerHTML = '';
    });
  });

  describe('event listeners on focusPortal', () => {
    it('pressing tab focuses on the portal if possible', () => {
      // Arrange
      const eventListeners = {};
      document.addEventListener = jest.fn((event, cb) => {
        eventListeners[event] = cb;
      });
      const expectedAutomationId = 'expected-element';
      const focusPortalRef = React.createRef();
      const onReturnFocus = jest.fn();
      render(
        <>
          <button ref={focusPortalRef} type="button" />
          <PortalFocusHelper focusPortalRef={focusPortalRef} onReturnFocus={onReturnFocus}>
            <input data-automationid={expectedAutomationId} />
          </PortalFocusHelper>
        </>,
      );

      // Act
      eventListeners.keydown({
        key: 'Tab',
        preventDefault: () => {},
        target: focusPortalRef.current,
      });

      // Assert
      expect(document.activeElement).toBe(screen.getByTestId(expectedAutomationId));
    });

    it('pressing tab calls onReturnFocus() if there is nothing in the portal that is focusable', () => {
      // Arrange
      const eventListeners = {};
      document.addEventListener = jest.fn((event, cb) => {
        eventListeners[event] = cb;
      });
      const focusPortal = document.createElement('button');
      const focusPortalRef = { current: focusPortal };
      const onReturnFocus = jest.fn();
      mount(<PortalFocusHelper focusPortalRef={focusPortalRef} onReturnFocus={onReturnFocus} />);

      // Act
      eventListeners.keydown({ key: 'Tab', target: focusPortal });

      // Assert
      expect(onReturnFocus).toHaveBeenCalled();
    });

    it('pressing shift+tab calls onReturnFocus()', () => {
      // Arrange
      const eventListeners = {};
      document.addEventListener = jest.fn((event, cb) => {
        eventListeners[event] = cb;
      });
      const focusPortal = document.createElement('button');
      const focusPortalRef = { current: focusPortal };
      const onReturnFocus = jest.fn();
      shallow(<PortalFocusHelper focusPortalRef={focusPortalRef} onReturnFocus={onReturnFocus} />);

      // Act
      eventListeners.keydown({
        key: 'Tab',
        shiftKey: true,
        target: focusPortal,
      });

      // Assert
      expect(onReturnFocus).toHaveBeenCalled();
    });
  });

  describe('event listeners on the element after focusPortal', () => {
    it('pressing shift+tab focuses on the portal if possible', () => {
      // Arrange
      const eventListeners = {};
      document.addEventListener = jest.fn((event, cb) => {
        eventListeners[event] = cb;
      });

      const expectedAutomationId = 'expected-element';
      const focusPortalRef = React.createRef();
      const onReturnFocus = jest.fn();
      const nextElementAutomationId = 'next-focusable-element';

      render(
        <>
          <button ref={focusPortalRef} type="button" />
          <button data-automationid={nextElementAutomationId} type="button" />
          <PortalFocusHelper focusPortalRef={focusPortalRef} onReturnFocus={onReturnFocus}>
            <input data-automationid={expectedAutomationId} />
          </PortalFocusHelper>
        </>,
      );

      // Act
      eventListeners.keydown({
        key: 'Tab',
        preventDefault: () => {},
        shiftKey: true,
        target: screen.getByTestId(nextElementAutomationId),
      });

      // Assert
      expect(document.activeElement).toEqual(screen.getByTestId(expectedAutomationId));
    });
  });
});

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownFooter from '../XUIDropdownFooter';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIModal from '../../modal/XUIModal';
import XUIButton from '../../button/XUIButton';
import { eventKeyValues } from '../../helpers/reactKeyHandler';
import wait from '../../../helpers/wait';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';

const testId = 'testDropdownId';
jest.mock('nanoid');
nanoid.mockImplementation(() => testId);

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

let openCalled = false;
let closeCalled = false;

const getTrigger = props => (
  <button className="xui-button xui-button-standard" {...props}>
    HOC Button
  </button>
);

const getDropdown = props => {
  return (
    <XUIDropdown restrictFocus={false}>
      <XUIPicklist>
        <XUIPickitem id="1">Im the whole shabang!</XUIPickitem>
        <XUIPickitem id="2">Earnings from Busking</XUIPickitem>
        <XUIPickitem id="3">Costs</XUIPickitem>
        <XUIPickitem id="4">Unnecessary Costs</XUIPickitem>
        <XUIPickitem id="5">Absolutely Necessary Costs</XUIPickitem>
      </XUIPicklist>
    </XUIDropdown>
  );
};

const testDropdown = (props = {}) => {
  return (
    <XUIDropdownToggled
      className="testClass"
      dropdown={props.dropdown || getDropdown()}
      onClose={() => (closeCalled = true)}
      onOpen={() => (openCalled = true)}
      trigger={getTrigger()}
      {...props}
    />
  );
};

describe('<XUIDropdownToggled />', () => {
  describe('New focus behaviour', () => {
    describe('without a footer', () => {
      const trigger = <XUIButton qaHook="trigger">Trigger</XUIButton>;

      const testDropdown = (
        <XUIDropdown restrictFocus={false} qaHook="dropdown">
          <XUIPicklist>
            <XUIPickitem id="1">Im the whole shabang</XUIPickitem>
            <XUIPickitem id="2">Earnings from Busking</XUIPickitem>
            <XUIPickitem id="3">Costs</XUIPickitem>
            <XUIPickitem id="4">Unnecessary Costs</XUIPickitem>
            <XUIPickitem id="5">Absolutely Necessary Costs</XUIPickitem>
          </XUIPicklist>
        </XUIDropdown>
      );

      const TestDropDownToggled = () => {
        return (
          <XUIDropdownToggled
            dropdown={testDropdown}
            forceDesktop
            qaHook="dropdownToggled"
            trigger={trigger}
            useNewFocusBehaviour
          />
        );
      };

      test('pressing enter from the trigger opens and focuses the dropdown', async () => {
        // Arrange
        render(<TestDropDownToggled />);

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);

        // Assert
        expect(screen.getByTestId('dropdown')).toHaveFocus();
      });

      test('tabbing from a dropdown closes the dropdown and focuses the next element', async () => {
        // Arrange
        render(
          <>
            <TestDropDownToggled />
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
      });

      test('shift tabbing from a dropdown closes the dropdown and focuses the trigger', async () => {
        // Arrange
        render(<TestDropDownToggled />);

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);
        userEvent.tab({ shift: true });

        // Assert
        expect(screen.getByTestId('trigger')).toHaveFocus();
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
      });
    });

    describe('with a footer', () => {
      const trigger = <XUIButton qaHook="trigger">Trigger</XUIButton>;

      const footer = (
        <XUIDropdownFooter
          pickItems={
            <XUIPickitem id="footerAction" qaHook="dropdownFooter">
              Add New Fruit
            </XUIPickitem>
          }
        />
      );

      const testDropdown = (
        <XUIDropdown footer={footer} restrictFocus={false} qaHook="dropdown">
          <XUIPicklist>
            <XUIPickitem id="1">Im the whole shabang</XUIPickitem>
            <XUIPickitem id="2">Earnings from Busking</XUIPickitem>
            <XUIPickitem id="3">Costs</XUIPickitem>
            <XUIPickitem id="4">Unnecessary Costs</XUIPickitem>
            <XUIPickitem id="5">Absolutely Necessary Costs</XUIPickitem>
          </XUIPicklist>
        </XUIDropdown>
      );

      const TestDropDownToggledWithFooter = () => {
        return (
          <XUIDropdownToggled
            useNewFocusBehaviour
            dropdown={testDropdown}
            forceDesktop
            trigger={trigger}
            qaHook="dropdownToggled"
          />
        );
      };

      test('pressing enter from the trigger opens and focuses the dropdown', async () => {
        // Arrange
        render(<TestDropDownToggledWithFooter />);

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);

        // Assert
        expect(screen.getByTestId('dropdown')).toHaveFocus();
      });

      test('tabbing from a dropdown focuses the dropdown footer', async () => {
        // Arrange
        render(<TestDropDownToggledWithFooter />);

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('dropdownFooter--body')).toHaveFocus();
      });

      test('tabbing from a dropdown footer closes the dropdown and focuses the next element', async () => {
        // Arrange
        render(
          <>
            <TestDropDownToggledWithFooter />
            <XUIButton qaHook="nextElement">Next Element</XUIButton>
          </>,
        );

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);
        userEvent.tab();
        userEvent.tab();

        // Assert
        expect(screen.getByTestId('nextElement')).toHaveFocus();
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
      });

      test('shift tabbing from a dropdown footer closes the dropdown and focuses the trigger', async () => {
        // Arrange
        render(<TestDropDownToggledWithFooter />);

        // Act
        userEvent.click(screen.getByTestId('trigger'));
        await wait(100);
        userEvent.tab();
        userEvent.tab({ shift: true });

        // Assert
        expect(screen.getByTestId('trigger')).toHaveFocus();
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
      });
    });
  });

  beforeEach(() => {
    openCalled = false;
    closeCalled = false;
  });

  describe('dropdown rendered closed', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = mount(testDropdown(), {
        wrappingComponent: ({ children }) => <div className="test-container">{children}</div>,
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('renders the list closed', () => {
      expect(wrapper.instance().isDropdownOpen()).toBeFalsy();
    });

    it('renders the list open on click of the trigger', () => {
      wrapper.find('.xui-button').simulate('click');

      expect(wrapper.state('isHidden')).toBeFalsy();
    });

    it('accepts classNames for the wrapping div', () => {
      expect(wrapper.find('testClass')).toBeTruthy();
    });

    it('calls the onOpen prop after the list is open', () => {
      wrapper.find('.xui-button').simulate('click');

      expect(openCalled).toBeTruthy();
      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();
    });

    it('calls the onClose prop after the list is closed', () => {
      wrapper.find('.xui-button').simulate('click');
      wrapper.find('.xui-button').simulate('click');

      expect(closeCalled).toBeTruthy();
    });

    // Failing to read state as it's out of scope when simulating the keyDown events
    it('opens the list when the down arrow is pressed from the trigger', () => {
      const trigger = wrapper.find('.xui-button');
      trigger.simulate('keyDown', { key: eventKeyValues.down, keyCode: 40, which: 40 });

      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();
    });

    it('opens the list when space is pressed from the trigger', () => {
      const trigger = wrapper.find('.xui-button');
      trigger.simulate('keyDown', { key: eventKeyValues.space, keyCode: 32, which: 32 });

      expect(wrapper.state('isHidden')).toBeFalsy();
    });

    it('should pass accessibility testing', async () => {
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe('closeOnSelect', function () {
    it('closes the dropdown when the user selects something by default', function () {
      const wrapper = mount(testDropdown({ isHidden: false }));

      document.querySelector('.xui-portal .xui-pickitem--body').click();

      expect(wrapper.instance().isDropdownOpen()).toBeFalsy();
    });

    it('does not close the dropdown on select if closeOnSelect is set to false', function () {
      const wrapper = mount(testDropdown({ isHidden: false, closeOnSelect: false }));

      document.querySelector('.xui-portal .xui-pickitem--body').click();

      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();
    });
  });

  describe('dropdown rendered open', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(testDropdown({ isHidden: false }));
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('closes the list when the esc key is pressed', () => {
      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();
      wrapper.find('.xui-button').simulate('keyDown', { key: eventKeyValues.tab, keyCode: 9 });

      expect(wrapper.instance().isDropdownOpen()).toBeFalsy();
    });

    it('closes the list when the tab key is pressed', () => {
      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();
      wrapper.find('.xui-button').simulate('keyDown', { key: eventKeyValues.escape, keyCode: 27 });

      expect(wrapper.instance().isDropdownOpen()).toBeFalsy();
    });

    it('expects a matching id on the dropdown and referenced by aria attributes', () => {
      expect(wrapper.html().includes(`aria-owns="xui-${testId}"`)).toBeTruthy();
      expect(
        wrapper.find('button').first().html().includes(`aria-controls="xui-${testId}"`),
      ).toBeTruthy();
    });

    it('should pass accessibility testing', async () => {
      wrapper = mount(
        <div>
          <XUIDropdownToggled dropdown={getDropdown()} isHidden={false} trigger={getTrigger()} />
          <div id="xui-testDropdownId">Mock dropdown for test purposes</div>
        </div>,
      );
      const results = await axe(wrapper.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe('dropdown in dropdown', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        testDropdown({
          isHidden: false,
          dropdown: <XUIDropdown>{testDropdown()}</XUIDropdown>,
        }),
      );
    });

    it('parent dropdown will not close when select the pickitem of child dropdown', async () => {
      // Find the trigger of the child dropdown
      document.querySelector('.xui-portal .xui-button').click();
      // And then select a pickitem of child dropdown
      document.querySelector('.xui-portal .xui-pickitem--body').click();

      expect(wrapper.instance().isDropdownOpen()).toBeTruthy();

      wrapper.unmount();
    });
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const automationId = renderer.create(
      <XUIDropdownToggled
        dropdown={getDropdown()}
        qaHook="ddt-example"
        trigger={getTrigger({ qaHook: 'ddt-example--trigger' })}
      />,
    );

    expect(automationId).toMatchSnapshot();
  });

  it('should not unlock the scroll when inside a modal', () => {
    const wrapper = mount(
      <XUIModal isOpen={true} closeButtonLabel="Close">
        {testDropdown({ isHidden: false })}
      </XUIModal>,
    );

    // Close the dropdown
    wrapper.find('.xui-pickitem--body').first().simulate('click');

    expect(document.querySelector('.xui-lockscroll')).toBeTruthy();
  });
});

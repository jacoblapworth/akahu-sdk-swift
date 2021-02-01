import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIModal from '../../modal/XUIModal';
import { eventKeyValues } from '../../helpers/reactKeyHandler';

const testId = 'testDropdownId';
jest.mock('nanoid');
nanoid.mockImplementation(() => testId);

Enzyme.configure({ adapter: new Adapter() });

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
      forceDesktop
      onClose={() => (closeCalled = true)}
      onOpen={() => (openCalled = true)}
      trigger={getTrigger()}
      {...props}
    />
  );
};

describe('<XUIDropdownToggled />', () => {
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
  });

  describe('dropdown in dropdown', () => {
    it('parent dropdown will not close when select the pickitem of child dropdown', async () => {
      const wrapper = mount(
        testDropdown({ isHidden: false, dropdown: <XUIDropdown>{testDropdown()}</XUIDropdown> }),
      );

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

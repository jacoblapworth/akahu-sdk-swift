import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIDropdown from '../XUIDropdown';
import XUIDropdownToggled from '../XUIDropdownToggled';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import { eventKeyValues } from '../../helpers/reactKeyHandler';
import { v4 as uuidv4 } from 'uuid';

const testId = 'testDropdownId';
jest.mock('uuid');
uuidv4.mockImplementation(() => testId);

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
      forceDesktop={true}
      onOpen={() => (openCalled = true)}
      onClose={() => (closeCalled = true)}
      trigger={getTrigger()}
      dropdown={getDropdown()}
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
      expect(wrapper.html().includes(`aria-owns="${testId}"`)).toBeTruthy();
      expect(
        wrapper.find('button').first().html().includes(`aria-controls="${testId}"`),
      ).toBeTruthy();
    });
  });

  it('should render a passed qaHook as an auotmation id', () => {
    const automationId = renderer.create(
      <XUIDropdownToggled
        qaHook="ddt-example"
        trigger={getTrigger({ qaHook: 'ddt-example--trigger' })}
        dropdown={getDropdown()}
      />,
    );

    expect(automationId).toMatchSnapshot();
  });

  // These are skipped as enzyme cannot test shit rendered in portal.
  describe.skip('closeOnSelect', function () {
    it('closes the dropdown when the user selects something by default', function () {
      const wrapper = getWrapper({ isHidden: false });

      wrapper.closest('body').find('.xui-pickitem').first().simulate('click');

      expect(wrapper.node.isDropdownOpen()).toBeFalsy();
    });

    it('does not close the dropdown on select if closeOnSelect is set to false', function () {
      const wrapper = getWrapper({ isHidden: false, closeOnSelect: false });

      wrapper.find('.xui-pickitem').first().simulate('click');

      expect(wrapper.node.isDropdownOpen()).toBeTruthy();
    });
  });
});

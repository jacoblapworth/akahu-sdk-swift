import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DropDown from '../DropDown';
import DropDownToggled from '../DropDownToggled';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import div from './helpers/container';
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

const getDropDown = props => {
  return (
    <DropDown restrictFocus={false}>
      <Picklist>
        <Pickitem id="1">Im the whole shabang!</Pickitem>
        <Pickitem id="2">Earnings from Busking</Pickitem>
        <Pickitem id="3">Costs</Pickitem>
        <Pickitem id="4">Unnecessary Costs</Pickitem>
        <Pickitem id="5">Absolutely Necessary Costs</Pickitem>
      </Picklist>
    </DropDown>
  );
};

const testDropDown = (props = {}) => {
  return (
    <DropDownToggled
      className="testClass"
      forceDesktop={true}
      onOpen={() => (openCalled = true)}
      onClose={() => (closeCalled = true)}
      trigger={getTrigger()}
      dropdown={getDropDown()}
      {...props}
    />
  );
};

describe('<DropDownToggled />', () => {
  beforeEach(() => {
    openCalled = false;
    closeCalled = false;
  });

  describe('dropdown rendered closed', function () {
    let wrapper;
    beforeEach(function () {
      wrapper = mount(testDropDown(), {
        wrappingComponent: ({ children }) => <div className="test-container">{children}</div>,
      });
    });

    it('renders the list closed', () => {
      expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
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
      expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
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

      expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
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
      wrapper = mount(testDropDown({ isHidden: false }));
    });

    it('closes the list when the esc key is pressed', () => {
      expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
      wrapper.find('.xui-button').simulate('keyDown', { key: eventKeyValues.tab, keyCode: 9 });

      expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
    });

    it('closes the list when the tab key is pressed', () => {
      expect(wrapper.instance().isDropDownOpen()).toBeTruthy();
      wrapper.find('.xui-button').simulate('keyDown', { key: eventKeyValues.escape, keyCode: 27 });

      expect(wrapper.instance().isDropDownOpen()).toBeFalsy();
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
      <DropDownToggled
        qaHook="ddt-example"
        trigger={getTrigger({ qaHook: 'ddt-example--trigger' })}
        dropdown={getDropDown()}
      />,
    );

    expect(automationId).toMatchSnapshot();
  });

  // These are skipped as enzyme cannot test shit rendered in portal.
  describe.skip('closeOnSelect', function () {
    it('closes the dropdown when the user selects something by default', function () {
      const wrapper = getWrapper({ isHidden: false });

      wrapper.closest('body').find('.xui-pickitem').first().simulate('click');

      expect(wrapper.node.isDropDownOpen()).toBeFalsy();
    });

    it('does not close the dropdown on select if closeOnSelect is set to false', function () {
      const wrapper = getWrapper({ isHidden: false, closeOnSelect: false });

      wrapper.find('.xui-pickitem').first().simulate('click');

      expect(wrapper.node.isDropDownOpen()).toBeTruthy();
    });
  });
});

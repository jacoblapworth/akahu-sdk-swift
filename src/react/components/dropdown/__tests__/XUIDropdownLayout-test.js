import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIDropdownLayout from '../XUIDropdownLayout';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });

function getWrapper(props = {}) {
  return mount(
    <XUIDropdownLayout {...props}>
      <XUIPicklist>
        <XUIPickitem id="1">Im the whole shabang!</XUIPickitem>
        <XUIPickitem id="2">Earnings from Busking</XUIPickitem>
        <XUIPickitem id="3">Costs</XUIPickitem>
        <XUIPickitem id="4">Unnecessary Costs</XUIPickitem>
        <XUIPickitem id="5">Absolutely Necessary Costs</XUIPickitem>
      </XUIPicklist>
    </XUIDropdownLayout>,
  );
}
describe('onOpenAnimationEnd', () => {
  it('should trigger when a "xui-dropdown-show" animation completes', () => {
    const onOpenAnimationEnd = jest.fn();
    const wrapper = getWrapper({ isHidden: false, onOpenAnimationEnd, animateOpen: true });

    wrapper.simulate('animationEnd', {
      animationName: 'xui-dropdown-mobile-show',
    });
    expect(onOpenAnimationEnd).toBeCalled();
  });
  it('should not trigger when a "xui-dropdown-hide" animation completes', () => {
    const onOpenAnimationEnd = jest.fn();
    const wrapper = getWrapper({ isHidden: false, onOpenAnimationEnd, animateClosed: true });

    wrapper.childAt(0).simulate('animationEnd', {
      animationName: 'xui-dropdown-mobile-hide',
    });
    expect(onOpenAnimationEnd).not.toBeCalled();
  });
});

describe('onCloseAnimationEnd', () => {
  it('should trigger when a "xui-dropdown-hide" animation completes', () => {
    const onCloseAnimationEnd = jest.fn();
    const wrapper = getWrapper({ isHidden: true, onCloseAnimationEnd, animateClosed: true });

    wrapper.childAt(0).simulate('animationEnd', {
      animationName: 'xui-dropdown-mobile-hide',
    });
    expect(onCloseAnimationEnd).toBeCalled();
  });
  it('should not trigger when a "xui-dropdown-show" animation completes', () => {
    const onCloseAnimationEnd = jest.fn();
    const wrapper = getWrapper({ isHidden: true, onCloseAnimationEnd, animateOpen: true });

    wrapper.childAt(0).simulate('animationEnd', {
      animationName: 'xui-dropdown-mobile-show',
    });
    expect(onCloseAnimationEnd).not.toBeCalled();
  });
});

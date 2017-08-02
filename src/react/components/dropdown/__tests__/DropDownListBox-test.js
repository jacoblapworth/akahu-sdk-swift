import React from 'react';
import { mount } from 'enzyme';
import DropDownListBox from '../DropDownListBox';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';

function getWrapper(props={}) {
	return mount(
		<DropDownListBox {...props}>
			<Picklist>
				<Pickitem id="1">
					Im the whole shabang!
				</Pickitem>
				<Pickitem id="2">
					Earnings from Busking
				</Pickitem>
				<Pickitem id="3">
					Costs
				</Pickitem>
				<Pickitem id="4">
					Unnecessary Costs
				</Pickitem>
				<Pickitem id="5">
					Absolutely Necessary Costs
				</Pickitem>
			</Picklist>
		</DropDownListBox>
	);
}
describe('onOpenAnimationEnd', () => {
	it('should trigger when a "xui-dropdown-show" animation completes', () => {
		const onOpenAnimationEnd = jest.fn();
		const wrapper = getWrapper({ isHidden: false, onOpenAnimationEnd, animateOpen: true });

		wrapper.find('.xui-dropdown--body').simulate('animationEnd', {
			animationName: 'xui-dropdown-mobile-show'
		});
		expect(onOpenAnimationEnd).toBeCalled();
	});
	it('should not trigger when a "xui-dropdown-hide" animation completes', () => {
		const onOpenAnimationEnd = jest.fn();
		const wrapper = getWrapper({ isHidden: false, onOpenAnimationEnd, animateClosed: true });

		wrapper.find('.xui-dropdown--body').simulate('animationEnd', {
			animationName: 'xui-dropdown-mobile-hide'
		});
		expect(onOpenAnimationEnd).not.toBeCalled();
	});
});

describe('onCloseAnimationEnd', () => {
	it('should trigger when a "xui-dropdown-hide" animation completes', () => {
		const onCloseAnimationEnd = jest.fn();
		const wrapper = getWrapper({ isHidden: true, onCloseAnimationEnd, animateClosed: true });

		wrapper.find('.xui-dropdown--body').simulate('animationEnd', {
			animationName: 'xui-dropdown-mobile-hide'
		});
		expect(onCloseAnimationEnd).toBeCalled();
	});
	it('should not trigger when a "xui-dropdown-show" animation completes', () => {
		const onCloseAnimationEnd = jest.fn();
		const wrapper = getWrapper({ isHidden: true, onCloseAnimationEnd, animateOpen: true });

		wrapper.find('.xui-dropdown--body').simulate('animationEnd', {
			animationName: 'xui-dropdown-mobile-show'
		});
		expect(onCloseAnimationEnd).not.toBeCalled();
	});
});

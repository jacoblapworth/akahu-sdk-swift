import React from 'react';
import { mount } from 'enzyme';
import XUIToggleOption from '../XUIToggleOption';
import XUIToggle from '../XUIToggle';

describe('XUIToggle', function() {

	// children property toggles
	it('should contain XUIToggleOption components if provided', function () {
		const wrapper = mount(
			<XUIToggle>
				<XUIToggleOption onChange={() => {}}/>
				<XUIToggleOption onChange={() => {}}/>
				<XUIToggleOption onChange={() => {}}/>
			</XUIToggle>
		);

		expect(wrapper.find(XUIToggleOption)).toHaveLength(3);
	});

	// className property (additional classes)
	it('should use additional classes if provided', function () {
		const c = 'dogs-are-totes-patotes';
		const wrapper = mount(<XUIToggle className={c} />);

		expect(wrapper.find(`.${c}`)).toHaveLength(1);
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const qaHook = 'cheese-and-crackers';
		const wrapper = mount(<XUIToggle qaHook={qaHook} />);
		expect(wrapper.find(`[data-automationid="${qaHook}"]`)).toHaveLength(1);
	});


	// color inverted
	it('should use the inverted color if defined', function () {
		const wrapper = mount(<XUIToggle color="inverted" />);
		expect(wrapper.find('.xui-toggle-inverted')).toHaveLength(1);
	});


	// layout fullwidth
	it('should use the fullwidth layout if defined', function () {
		const wrapper = mount(<XUIToggle layout="fullwidth" />);
		expect(wrapper.find('.xui-toggle-fullwidth-layout')).toHaveLength(1);
	});
});

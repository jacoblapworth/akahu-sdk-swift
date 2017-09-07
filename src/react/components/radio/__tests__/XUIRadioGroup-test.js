import React from 'react';
import { mount } from 'enzyme';
import XUIRadio from '../XUIRadio';
import XUIRadioGroup from '../XUIRadioGroup';

const NOOP = () => {};

describe('XUIRadioGroup', function() {

	// children property radios
	it('should contain XUIRadio components if provided', function () {
		const wrapper = mount(
			<XUIRadioGroup>
				<XUIRadio onChange={NOOP} />
				<XUIRadio onChange={NOOP} />
				<XUIRadio onChange={NOOP} />
			</XUIRadioGroup>
		);

		expect(wrapper.children()).toHaveLength(3);
		wrapper.children().forEach(child => expect(child.hasClass('xui-styledcheckboxradio')).toBeTruthy());
	});


	// children property non-radios
	it('should contain children regardless of type', function () {
		const wrapper = mount(
			<XUIRadioGroup>
				<div className="div">dogs</div>
				<span className="span">patotes</span>
				<label className="label">cats</label>
			</XUIRadioGroup>
		);

		expect(wrapper.find('div.div').first().text()).toEqual('dogs');
		expect(wrapper.find('span.span').first().text()).toEqual('patotes');
		expect(wrapper.find('label.label').first().text()).toEqual('cats');
	});


	// className property (additional classes)
	it('should use additional classes if provided', function () {
		const wrapper = mount(
			<XUIRadioGroup className="dogs-are-totes-patotes" />
		);
		expect(wrapper.find('.dogs-are-totes-patotes.xui-styledcheckboxradio-group')).toHaveLength(1);
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const wrapper = mount(
			<XUIRadioGroup qaHook="cheese-and-crackers" />
		);

		expect(wrapper.getDOMNode().getAttribute('data-automationid')).toEqual('cheese-and-crackers');
	});

});

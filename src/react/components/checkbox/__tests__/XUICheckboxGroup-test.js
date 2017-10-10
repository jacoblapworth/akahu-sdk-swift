import React from 'react';
import { mount } from 'enzyme';
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';

const NOOP = () => {} // No operation function

describe('XUICheckboxGroup', function() {

	// children property checkboxes
	it('should contain XUICheckbox components if provided', function () {
		const wrapper = mount(
			<XUICheckboxGroup>
				<XUICheckbox onChange={NOOP} />
				<XUICheckbox onChange={NOOP} />
				<XUICheckbox onChange={NOOP} />
			</XUICheckboxGroup>
		);

		expect(wrapper.find('.xui-styledcheckboxradio')).toHaveLength(3);
	});


	// children property non-checkboxes
	it('should contain children regardless of type', function () {
		const wrapper = mount(
			<div>
				<XUICheckboxGroup>
					<div className="dogs">dogs</div>
					<span className="patotes">patotes</span>
					<label className="cats">cats</label>
				</XUICheckboxGroup>
			</div>
		);

		expect(wrapper.find('div.dogs').first().text()).toEqual('dogs');
		expect(wrapper.find('span.patotes').first().text()).toEqual('patotes');
		expect(wrapper.find('label.cats').first().text()).toEqual('cats');
	});


	// className property (additional classes)
	it('should use additional classes if provided', function () {
		const wrapper = mount(<XUICheckboxGroup className="dogs-are-totes-patotes" />);

		expect(wrapper.getDOMNode().getAttribute('class')).toEqual(expect.stringContaining('dogs-are-totes-patotes'));
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const wrapper = mount(<XUICheckboxGroup qaHook="cheese-and-crackers" />);

		expect(wrapper.getDOMNode().getAttribute('data-automationid')).toEqual(expect.stringContaining('cheese-and-crackers'));
	});

});

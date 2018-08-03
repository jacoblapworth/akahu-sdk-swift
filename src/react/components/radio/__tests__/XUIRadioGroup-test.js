import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIRadio from '../XUIRadio';
import XUIRadioGroup from '../XUIRadioGroup';

Enzyme.configure({ adapter: new Adapter() });

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

		expect(wrapper.find(XUIRadio)).toHaveLength(3);
		expect(wrapper.find('.xui-styledcheckboxradio')).toHaveLength(3);
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
		const wrapper = mount(<XUIRadioGroup qaHook="cheese-and-crackers" />);

		expect(wrapper.find('[data-automationid="cheese-and-crackers"]')).toHaveLength(1);
	});

	it('should include a visible label', () => {
		const labelTest = mount(<XUIRadioGroup groupLabel="Birds" />);
		expect(labelTest.find('.xui-text-label')).toHaveLength(1);
	});

	it('should include a hidden ARIA label, if provided a label and flagged to hide', () => {
		const testLabel = "Birds";
		const hiddenLabelTest = mount(<XUIRadioGroup groupLabel={testLabel} isLabelHidden />);
		expect(hiddenLabelTest.find('[aria-label="Birds"]')).toHaveLength(1);
	});
});

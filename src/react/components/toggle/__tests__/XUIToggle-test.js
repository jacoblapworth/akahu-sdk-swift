import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import XUIToggleOption from '../XUIToggleOption';
import XUIToggle from '../XUIToggle';

Enzyme.configure({ adapter: new Adapter() });

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

		expect(wrapper.hasClass(c)).toBeTruthy();
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const automationid = renderer.create(<XUIToggle qaHook='cheese-and-crackers' />);
		expect(automationid).toMatchSnapshot();
	});


	// color inverted
	it('should use the inverted color if defined', function () {
		const wrapper = mount(<XUIToggle color="inverted" />);
		expect(wrapper.find('.xui-toggle-inverted')).toHaveLength(1);
	});


	// small variant inverted
	it('should use the small modifier if the small variant is provided', function () {
		const wrapper = mount(<XUIToggle variant="small" />);
		expect(wrapper.find('.xui-toggle-small')).toHaveLength(1);
	});


	// layout fullwidth
	it('should use the fullwidth layout if defined', function () {
		const wrapper = mount(<XUIToggle layout="fullwidth" />);
		expect(wrapper.find('.xui-toggle-fullwidth-layout')).toHaveLength(1);
	});
});

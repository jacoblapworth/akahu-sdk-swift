import React from 'react';
import XUITag from '../XUITag';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const variants = {
	neutral: 'xui-tag-neutral',
	positive: 'xui-tag-positive',
	negative: 'xui-tag-negative',
	warning: 'xui-tag-warning'
};

describe('<XUITag/>', () => {
	it('renders with just the base class when no variant is passed in', () => {
		const wrapper = mount(<XUITag>Testing 💩</XUITag>);
		const tag = wrapper.find('span');
		expect(tag.hasClass('xui-tag')).toBeTruthy();
		Object.keys(variants).map(key => variants[key]).forEach(variantClass =>
			expect(tag.hasClass(variantClass)).toEqual(false)
		);
		expect(tag.text()).toEqual('Testing 💩');
	});

	it('renders with the correct variant classes', () => {
		Object.keys(variants).forEach(variant => {
			const tag = shallow(<XUITag variant={variant}>Testing 💩</XUITag>);
			// const tag = wrapper.has;
			expect(tag.hasClass(variants[variant])).toEqual(true);
		});
	});

	it('renders classes that are passed in', () => {
		const wrapper = mount(<XUITag className="testClass">Testing 💩</XUITag>);
		const tag = wrapper.find(XUITag);
		expect(tag.hasClass("testClass")).toEqual(true);
	});

	it('renders a qaHook when passed in', () => {
		const automationid = renderer.create(<XUITag qaHook="schwifty">Testing 💩</XUITag>);
		expect(automationid).toMatchSnapshot();
	});
});

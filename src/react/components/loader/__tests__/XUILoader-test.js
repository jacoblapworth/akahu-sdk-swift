import React from 'react';
import { mount } from 'enzyme';
import XUILoader from '../XUILoader';

describe('XUILoader', function () {
	it('should render with an aria label describing its purpose', function () {
		const testString = 'Something is loading, please wait';
		const wrapper = mount(<XUILoader label={testString} />);
		expect(wrapper.getDOMNode().getAttribute('aria-label')).toEqual(testString);
	});

	it('should add extra classes when defined', function () {
		const testClass = 'test-class';
		const wrapper = mount(<XUILoader className={testClass} label="Something is loading, please wait" />);
		expect(wrapper.getDOMNode().classList.contains(testClass)).toBeTruthy();
	});

	it('should add the layout class by default', function () {
		const testClass = 'test-class';
		const wrapper = mount(<XUILoader className={testClass} label="Something is loading, please wait" />);
		expect(wrapper.getDOMNode().classList.contains('xui-loader-layout')).toBeTruthy();
	});

	it('should not add the layout class if `defaultLayout` is set to `false`', function () {
		const wrapper = mount(<XUILoader defaultLayout={false} label="Something is loading, please wait" />);
		expect(wrapper.getDOMNode().classList.contains('xui-loader-layout')).toBeFalsy();
	});

	it('should add appropriate size classes', function () {
		const wrapper = mount(
			<div>
				<XUILoader label="Something is loading, please wait" />
				<XUILoader size="small" label="Something is loading, please wait" />
				<XUILoader size="large" label="Something is loading, please wait" />
			</div>
		);

		const loaders = wrapper.find('.xui-loader-layout');
		expect(loaders.at(0).hasClass('xui-loader')).toBeTruthy();
		expect(loaders.at(1).hasClass('xui-loader-small')).toBeTruthy();
		expect(loaders.at(2).hasClass('xui-loader-large')).toBeTruthy();
	});

	it('should add the inverted class if `isInverted` is set to `true`', () => {
		const wrapper = mount(
			<XUILoader
				isInverted={true}
				label="Something is loading, please wait" />
		);

		expect(wrapper.getDOMNode().classList.contains('xui-loader-inverted')).toBeTruthy();
	});

	it('should add the retain layout class if `retainLayout` is set to `true`', function () {
		const wrapper = mount(
			<XUILoader
				retainLayout={true}
				label="Something is loading, please wait" />
		);
		expect(wrapper.getDOMNode().classList.contains('xui-loader-retain-layout')).toBeTruthy();
	});
});

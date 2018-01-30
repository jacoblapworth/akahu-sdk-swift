import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

import XUIAvatarCounter from '../XUIAvatarCounter';

describe('XUIAvatarCounter', () => {
	it('should render just my string when given "a"', () => {
		const test = <XUIAvatarCounter count="a"/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = mount(test);
		expect(jestDom.text()).toBe('a');
	});

	it('should render +1 when I pass in a number 1', () => {
		const test = <XUIAvatarCounter count={1}/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = mount(test);
		expect(jestDom.text()).toBe('+1');
	});

	it('should render 0 when I pass in a number 0', () => {
		const test = <XUIAvatarCounter count={0}/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = mount(test);
		expect(jestDom.text()).toBe('0');
	});

	it('should render -1 when I pass in a number -1', () => {
		const test = <XUIAvatarCounter count={-1}/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = mount(test);
		expect(jestDom.text()).toBe('-1');
	});

	it('should be null when I pass in an empty string', () => {
		const test = <XUIAvatarCounter count=''/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();
	});

	describe('Expected proptype failures', () => {

		it('should throw an error when nothing is provided to the count prop', () => {
			expect(() => renderer.create(
				<XUIAvatarCounter />
			)).toThrow();
		});

		it('should throw an error if you pass something other than a string or a number to the count prop', () => {
			expect(() => renderer.create(
				<XUIAvatarCounter count={true} />
			)).toThrow();
		});

		it('should throw an error if you pass something other than an expected string to the size prop', () => {
			expect(() => renderer.create(
				<XUIAvatarCounter size='fred' />
			)).toThrow();
		});
	});

});
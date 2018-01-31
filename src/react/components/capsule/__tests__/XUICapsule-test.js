import React from 'react';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUICapsule from '../XUICapsule';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICapsule />', () => {

	it('renders the capsule with correct XUI classes', () => {
		const capsule = shallow(
			<XUICapsule></XUICapsule>
		);
		expect(capsule.hasClass('xui-capsule')).toBe(true);
	});

	it('renders the capsule with the specified className prop', () => {
		const capsule = shallow(
			<XUICapsule className='xui-test-class'></XUICapsule>
		);
		expect(capsule.hasClass('xui-test-class')).toBe(true);
	});

	it('renders the capsule with text if provided', () => {
		const capsule = render(
			<XUICapsule>Howdy, folks!</XUICapsule>
		);
		expect(capsule.text()).toEqual('Howdy, folks!');
	});

	it('renders the capsule with the invalid class when the isValid prop is false', () => {
		const capsule = render(
			<XUICapsule isValid={false}></XUICapsule>
		);
		expect(capsule.hasClass('xui-capsule-invalid')).toBe(true);
	});

	it('renders the capsule with the interactive class when the capsule is interactive', () => {
		const capsule = render(
			<XUICapsule href={'www.google.com'}></XUICapsule>
		);
		expect(capsule.hasClass('xui-capsule-interactive')).toBe(true);
	});

	it('invokes the callback passed into the onClick prop', () => {
		const callback = jest.fn();
		const capsule = mount(
			<XUICapsule onClick={callback}></XUICapsule>
		);
		capsule.find('a').simulate('click');
		expect(callback.mock.calls.length).toEqual(1);
	});
});

import React from 'react';
import { mount, render } from 'enzyme';
import XUIToast from '../XUIToast';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import XUIToastMessage from '../XUIToastMessage';

describe('XUIToast', () => {

	it('should render without a sentiment modifier if no sentiment is provided', function () {
		const wrapper = render(<XUIToast/>);
		const toast = wrapper.find('.xui-toast');
		expect(toast.hasClass('xui-toast')).toBeTruthy();
		expect(toast.hasClass('xui-toast-negative')).toBeFalsy();
		expect(toast.hasClass('xui-toast-positive')).toBeFalsy();
	});

	it('should render with the negative sentiment modifier when sentiment is set to negative', function () {
		const wrapper = render(<XUIToast sentiment="negative" />);
		const toast = wrapper.find('.xui-toast');

		expect(toast.hasClass('xui-toast-negative')).toBeTruthy();
		expect(toast.hasClass('xui-toast-positive')).toBeFalsy();
	});

	it('should render with the positive sentiment modifier when sentiment is set to positive', function () {
		const wrapper = mount(<XUIToast sentiment="positive" />);
		const toast = wrapper.find('.xui-toast');

		expect(toast.hasClass('xui-toast-negative')).toBeFalsy();
		expect(toast.hasClass('xui-toast-positive')).toBeTruthy();
	});

	it('should render the provided XUIToastMessage element', function () {
		const message = '💩 Pile of Poo'
		const wrapper = render(<XUIToastMessage>{message}</XUIToastMessage>);
		expect(wrapper.text()).toEqual(message);
	});

	it('should render without a close button if no close click function is provided', function () {
		const wrapper = mount(<XUIToast />);

		expect(wrapper.find('.xui-toast--close')).toHaveLength(0);
	});

	it('should render with a close button if close click function is provided', function () {
		const wrapper = mount(<XUIToast onCloseClick={function(){}} />);

		expect(wrapper.find('.xui-toast--close')).toHaveLength(1);
	});

	it('should add the appropriate `role` attribute depending on the sentiment (`alert` for positive/negative; else `status`)', function () {
		const wrapper = render(
			<div>
				<XUIToast sentiment="positive" />
				<XUIToast sentiment="negative" />
				<XUIToast />
			</div>
		);

		const toasts = wrapper.find('.xui-toast');
		expect(toasts[0].attribs['role']).toEqual('alert');
		expect(toasts[1].attribs['role']).toEqual('alert');
		expect(toasts[2].attribs['role']).toEqual('status');
	});

	it('should allow a custom `role` to be set', function () {
		const wrapper = render(
			<div>
				<XUIToast role="alert" />
				<XUIToast role="status" sentiment="negative" />
			</div>
		);

		const toasts = wrapper.find('.xui-toast');
		expect(toasts[0].attribs['role']).toEqual('alert');
		expect(toasts[1].attribs['role']).toEqual('status');
	});

	it('should render toast actions as buttons and/or links with the appropriate classes', function () {
		const wrapper = mount(
			<XUIToast>
				<XUIToastActions>
					<XUIToastAction href="https://google.com">Hello</XUIToastAction>
					<XUIToastAction onClick={() => {}}>Goodbye</XUIToastAction>
				</XUIToastActions>
			</XUIToast>
		);

		expect(wrapper.find('.xui-toast--action')).toHaveLength(2);
		expect(wrapper.find('a')).toHaveLength(1);
		expect(wrapper.find('button')).toHaveLength(1);
	});
});

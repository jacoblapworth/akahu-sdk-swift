import React from 'react';
import { mount, render } from 'enzyme';
import XUIToast from '../XUIToast';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import XUIToastMessage from '../XUIToastMessage';

describe('XUIToast', () => {

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

	it('should allow a custom `role` to be set', function () {
		const wrapper = render(
			<div>
				<XUIToast role="alert" />
				<XUIToast role="status" />
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

import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastAction from '../XUIToastAction';

describe('<XUIToastAction />', () => {
	it('should render a passed qaHook as an automation id', () => {
		const toastAction = renderer.create(
			<XUIToastAction qaHook="toast-action">
				Action 1
			</XUIToastAction>
		);

		expect(toastAction).toMatchSnapshot();
	});

	it('should render a custom href because it\'s a link', () => {
		const toastAction = renderer.create(
			<XUIToastAction href="https://www.xero.com">
				Action 1
			</XUIToastAction>
		);

		expect(toastAction).toMatchSnapshot();
	});

	it('should be able to render custom class names', () => {
		const toastAction = renderer.create(
			<XUIToastAction className="custom-class">
				Action 1
			</XUIToastAction>
		);

		expect(toastAction).toMatchSnapshot();
	});
});

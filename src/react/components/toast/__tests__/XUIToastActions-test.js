import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastActions from '../XUIToastActions';
import XUIToastAction from '../XUIToastAction';

describe('<XUIToastActions />', () => {
	it('should render a passed qaHook as an automation id', () => {
		const toastActions = renderer.create(
			<XUIToastActions qaHook="toast-actions">
				<XUIToastAction>Action 1</XUIToastAction>
				<XUIToastAction>Action 2</XUIToastAction>
			</XUIToastActions>
			);

			expect(toastActions).toMatchSnapshot();
	});

	it('should render non-breaking in the old API style', () => {
		const toastActions = renderer.create(
			<XUIToastActions
				className="custom-class"
				qaHook="toast-actions">
				<XUIToastAction href="#">Action 1</XUIToastAction>
				<XUIToastAction href="#">Action 2</XUIToastAction>
			</XUIToastActions>
			);

			expect(toastActions).toMatchSnapshot();
	});

	it('should render using the new API style', () => {
		const toastActions = renderer.create(
			<XUIToastActions
				className="custom-class"
				qaHook="toast-actions"
				primaryAction={<XUIToastAction href="#">Action 1</XUIToastAction>}
				secondaryAction={<XUIToastAction href="#">Action 2</XUIToastAction>}>
			</XUIToastActions>
			);

			expect(toastActions).toMatchSnapshot();
	});
});

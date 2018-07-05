import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUITooltip from '../XUITooltip';
import PositioningInline from '../../positioning/PositioningInline';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

const setup = (props = {}, fn = renderer.create) => {
	jest.clearAllTimers();
	const createTriggerLink = () => {
		return <a href="javascript:void(0);">A link</a>;
	};

	const expected = fn(
		<XUITooltip trigger={createTriggerLink()} id="test" {...props}>Tip goes here</XUITooltip>
	);

	return { expected };
};

describe('XUITooltip', () => {
	it('renders correctly', () => {
		const { expected } = setup();

		expect(expected).toMatchSnapshot();
	});

	it('include an automation-id', () => {
		const { expected } = setup({ qaHook: 'test-tooltip'});

		expect(expected).toMatchSnapshot();
	});

	it('include an id, if provided', () => {
		const { expected } = setup({ id: 'test-tooltip-id'});

		expect(expected).toMatchSnapshot();
	});

	it('include provided classNames', () => {
		const { expected } = setup({ className: 'test-tooltip-class'});

		expect(expected).toMatchSnapshot();
	});

	it('include provided wrapperClassNames', () => {
		const { expected } = setup({ wrapperClassName: 'test-tooltip-wrapperClass'});

		expect(expected).toMatchSnapshot();
	});

	it('allows for different trigger components to be passed', () => {
		const { expected } = setup({ trigger: <span style={{textDecoration: "underline"}}>look at what we have</span> });

		expect(expected).toMatchSnapshot();
	});

	it('sets visibility classes, if set to be visible', () => {
		const { expected } = setup({ isHidden: false });

		expect(expected).toMatchSnapshot();
	});

	it('sets maxHeight', () => {
		const { expected } = setup({ maxHeight: 1000 });

		expect(expected).toMatchSnapshot();
	});

	it('sets maxWidth', () => {
		const { expected } = setup({ maxWidth: 1000 });

		expect(expected).toMatchSnapshot();
	});

	describe('tests triggering events', () => {
		it('shows the tooltip on mouseOver of the tip wrapper', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('mouseOver');
			jest.runTimersToTime(2000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('does NOT display the tip on mouseOver, if triggerOnHover is false', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({triggerOnHover: false, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('mouseOver');
			jest.runTimersToTime(1000);

			expect(onEventSpy).not.toBeCalled();
		});

		it('does NOT display the tip on mouseOver, if tip is disabled', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({isDisabled: true, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('mouseOver');
			jest.runTimersToTime(1000);

			expect(onEventSpy).not.toBeCalled();
		});

		it('closes the tooltip on mouseOut of the tip wrapper', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({onClose: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('mouseOver');
			jest.runTimersToTime(1000);
			expected.find('.xui-tooltip a').simulate('mouseOut');
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('shows the tooltip on click of the trigger, if triggerOnClick is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({triggerOnHover: false, triggerOnClick: true, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('click');
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('does NOT display the tip on click of the trigger, if triggerOnClick is false (default)', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({triggerOnHover: false, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('click');
			jest.runTimersToTime(1000);

			expect(onEventSpy).not.toBeCalled();
		});

		it('closes the tooltip on second click of the trigger, if triggerOnClick is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({ triggerOnHover: false, triggerOnClick: true, onClose: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('click');
			jest.runTimersToTime(1000);
			expected.find('.xui-tooltip a').simulate('click');
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('shows the tooltip on "Enter" keypress, if triggerOnClick is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({ triggerOnClick: true, onOpen: onEventSpy }, mount);

			expected.find('.xui-tooltip a').simulate('focus');
			expected.find('.xui-tooltip a').simulate('keyDown', { keyCode: 13 });
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('closes the tooltip on second "Enter" keypress, if triggerOnClick is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({ triggerOnClick: true, onClose: onEventSpy }, mount);

			expected.find('.xui-tooltip a').simulate('focus');
			expected.find('.xui-tooltip a').simulate('keyDown', { keyCode: 13 });
			jest.runTimersToTime(1000);
			expected.find('.xui-tooltip a').simulate('keyDown', { keyCode: 13 });
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('shows the tooltip on focus of the trigger, if triggerOnFocus is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({ triggerOnHover: false, triggerOnFocus: true, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('focus');
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});

		it('does NOT display the tip on focus of the trigger, if triggerOnFocus is false (default)', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({triggerOnHover: false, onOpen: onEventSpy}, mount);

			expected.find('.xui-tooltip a').simulate('focus');
			jest.runTimersToTime(1000);

			expect(onEventSpy).not.toBeCalled();
		});

		it('closes the tooltip on blur of the trigger, if triggerOnFocus is true', () => {
			const onEventSpy = jest.fn();
			const { expected } = setup({ triggerOnFocus: true, onClose: onEventSpy }, mount);

			expected.find('.xui-tooltip a').simulate('focus');
			jest.runTimersToTime(1000);
			expected.find('.xui-tooltip a').simulate('blur');
			jest.runTimersToTime(1000);

			expect(onEventSpy).toHaveBeenCalledTimes(1);
		});
	});

	it('calls the onOpen spy when provided as a prop', () => {
		const onEventSpy = jest.fn();
		const { expected } = setup({onOpen: onEventSpy}, mount);

		expected.find('.xui-tooltip a').simulate('mouseOver');
		expect(onEventSpy).not.toBeCalled();

		jest.runTimersToTime(1000);
		expect(onEventSpy).toHaveBeenCalledTimes(1);
	});

	it('calls the onClose spy when provided as a prop', () => {
		const onEventSpy = jest.fn();
		const { expected } = setup({onClose: onEventSpy}, mount);

		expected.find('.xui-tooltip a').simulate('mouseOver');
		jest.runTimersToTime(1000);
		expected.find('.xui-tooltip a').simulate('mouseOut');
		expect(onEventSpy).not.toBeCalled();

		jest.runTimersToTime(1000);
		expect(onEventSpy).toHaveBeenCalledTimes(1);
	});

	it('adjusts opening delay, when provided', () => {
		const onEventSpy = jest.fn();
		const { expected } = setup({onOpen: onEventSpy, openDelay: 5000}, mount);

		expected.find('.xui-tooltip a').simulate('mouseOver');

		jest.runTimersToTime(1000);
		expect(onEventSpy).not.toBeCalled();

		jest.runTimersToTime(6000);
		expect(onEventSpy).toHaveBeenCalledTimes(1);
	});

	it('adjusts closing delay, when provided', () => {
		const onEventSpy = jest.fn();
		const { expected } = setup({onClose: onEventSpy, closeDelay: 5000}, mount);

		expected.find('.xui-tooltip a').simulate('mouseOver');
		jest.runTimersToTime(1000);
		expected.find('.xui-tooltip a').simulate('mouseOut');
		jest.runTimersToTime(1000);
		expect(onEventSpy).not.toBeCalled();

		jest.runTimersToTime(6000);
		expect(onEventSpy).toHaveBeenCalledTimes(1);
	});

	it(`preferredPosition prop gets passed down to the child PositioningInline component`, () => {
		const { expected } = setup({ preferredPosition: 'right-top' }, mount);

		const posInline = expected.find(PositioningInline);
		expect(posInline.props().preferredPosition).toEqual('right-top');
		// Not testing the resultant classes of the tooltip, since that is dynamically calculated on the viewport.
	});
});

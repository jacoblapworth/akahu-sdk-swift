import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import noop from '../../helpers/noop';
import AccordionTrigger from '../customElements/AccordionTrigger';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordion /> | Accordion Trigger', () => {
	it('should render an automation id when passed in the qaHook prop', () => {
		const component = renderer.create(
			<AccordionTrigger
				toggleLabel="Toggle"
				onClick={noop}
				qaHook="test-qahook"
				primaryHeading="John Smith"
			/>
		);

		expect(component).toMatchSnapshot();
	});

	it('should render closed', () => {
		const component = renderer.create(
			<AccordionTrigger
				toggleLabel="Toggle"
				onClick={noop}
				primaryHeading="John Smith"
			/>
		);

		expect(component).toMatchSnapshot();
	});

	it('should render open', () => {
		const component = renderer.create(
			<AccordionTrigger
				toggleLabel="Toggle"
				isOpen
				onClick={noop}
				primaryHeading="John Smith"
			/>
		);

		expect(component).toMatchSnapshot();
	});

	it('should render with available props', () => {
		const component = renderer.create(
			<AccordionTrigger
				toggleLabel="Toggle"
				onClick={noop}
				primaryHeading="John Smith"
				leftContent={<abbr role="presentation">GB</abbr>}
				secondaryHeading={(
					<div>
						<span>Nodes!</span>
						<br />Plain text
					</div>
				)}
				pinnedValue="00:00"
				action={<button>Action</button>}
				overflow={<button>...</button>}
				custom={<div>Custom content</div>}
			/>
		);

		expect(component).toMatchSnapshot();
	});

	it('should call onClick handler', () => {
		const qaHook = 'test-id';
		const onClick = jest.fn();
		const component = mount(
			<AccordionTrigger
				toggleLabel="Toggle"
				onClick={onClick}
				qaHook={qaHook}
				primaryHeading="John Smith"
			/>
		);

		component.find(`[data-automationid="${qaHook}"]`).simulate('click');
		expect(onClick).toHaveBeenCalled();
	});

	it('should call onClick handler on keydown for space and enter', () => {
		const qaHook = 'test-id';
		const onClick = jest.fn();
		const component = mount(
			<AccordionTrigger
				toggleLabel="Toggle"
				onClick={onClick}
				qaHook={qaHook}
				primaryHeading="John Smith"
			/>
		);
		const keyDownNode = component.find(`[data-automationid="${qaHook}"]`)
		const keyCodes = [13, 32];

		keyCodes.forEach(keyCode => keyDownNode.simulate('keyDown', { keyCode }));
		expect(onClick).toHaveBeenCalledTimes(2);
	});
});

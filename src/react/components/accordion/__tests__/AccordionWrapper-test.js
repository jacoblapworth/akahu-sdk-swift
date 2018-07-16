import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AccordionWrapper from '../customElements/AccordionWrapper';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordion /> | Accordion Wrapper', () => {
	it('should render open, and not pop', () => {
		const component = renderer.create(
			<AccordionWrapper
				isOpen
				trigger={<div>John Smith</div>}>
				<div>Accountant</div>
			</AccordionWrapper>
		);

		component.getInstance().setState({ left: 0, right: 1024 });
		expect(component).toMatchSnapshot();
	});

	it('should render open, and pop', () => {
		const component = renderer.create(
			<AccordionWrapper
				isOpen
				trigger={<div>John Smith</div>}>
				<div>Accountant</div>
			</AccordionWrapper>
		);

		component.getInstance().setState({ left: 30, right: 970 });
		expect(component).toMatchSnapshot();
	});
});

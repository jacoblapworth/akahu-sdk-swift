import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme'; // eslint-disable-line no-unused-vars
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordion from '../XUIAccordion';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordion />', () => {
	it('renders the base component with only required props passed', () => {
		const testComponent = renderer.create(<XUIAccordion name="testName" />);
		expect(testComponent).toMatchSnapshot();
	});
	it('renders the component using all available options', () => {
		const testComponent = renderer.create(<XUIAccordion name="testName" className="testClass" />);
		expect(testComponent).toMatchSnapshot();
	});
});

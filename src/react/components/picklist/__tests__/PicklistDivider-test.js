import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PicklistDivider from '../PicklistDivider';

Enzyme.configure({ adapter : new Adapter() });

describe('<PicklistDivider />', () => {
	it('basic example', () => {
		const header = renderer.create(<PicklistDivider />);
		expect(header).toMatchSnapshot();
	});

	it('with custom class', () => {
		const header = renderer.create(<PicklistDivider className="custom-divider" />);
		expect(header).toMatchSnapshot();
	});
});

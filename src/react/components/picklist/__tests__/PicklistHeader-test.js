import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PicklistHeader from '../PicklistHeader';

Enzyme.configure({ adapter : new Adapter() });

describe('<PicklistHeader />', () => {
	it('basic example', () => {
		const header = renderer.create(<PicklistHeader>Some header text</PicklistHeader>);
		expect(header).toMatchSnapshot();
	});

	it('with all options', () => {
		const allOptions = renderer.create(
			<PicklistHeader
				id="headerId"
				className="custom-header-class"
				ariaRole="presentation"
			>
				Some header text
			</PicklistHeader>
		);
		expect(allOptions).toMatchSnapshot();
	});
});

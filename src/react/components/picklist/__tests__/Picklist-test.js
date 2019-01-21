import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Picklist from '../Picklist';
import Pickitem from '../Pickitem';
import uuidv4 from 'uuid/v4';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testPickitemCheckboxId');

const setup = (props = {}, itemProps = {}) => {
	const expected = renderer.create(
		<Picklist {...props}>
			<Pickitem primaryElement="Item content" id="pi1" {...itemProps} />
		</Picklist>
	);

	return expected;
};

describe('< Picklist />', () => {
	it('renders most basic example', () => {
		const basic = setup();
		expect(basic).toMatchSnapshot();
	});

	it('example with most compatible options', () => {
		const settings = {
			className: 'custom-picklist-class',
			id: 'picklistId',
			isHorizontal: true,
			size: 'small',
			defaultLayout: false,
			shouldTruncate: true,
			secondaryProps: { role: 'presentation' },
			qaHook: 'picklist-example',
		};
		const mostOptions = setup(settings);
		expect(mostOptions).toMatchSnapshot();
	});

	it('example of list settings overriding item-level settings', () => {
		const settings = {
			size: 'small',
			isMultiselect: false,
			shouldTruncate: true,
		};
		const itemProps = {
			size: 'medium',
			isMultiselect: true,
		};
		const overrides = setup(settings, itemProps);
		expect(overrides).toMatchSnapshot();
	});

	it('example taking settings from first child and giving to all', () => {
		const fromItems = renderer.create(
			<Picklist>
				<Pickitem
					primaryElement="Item content"
					id="pi1"
					size="small"
					isMultiselect={true}
				/>
				<Pickitem
					primaryElement="Item two"
					id="pi2"
				/>
			</Picklist>
		);
		expect(fromItems).toMatchSnapshot();
	});
});

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Pickitem from '../Pickitem';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';
import arrow from '@xero/xui-icon/icons/arrow';
import uuidv4 from 'uuid/v4';

Enzyme.configure({ adapter : new Adapter() });

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testPickitemCheckboxId');

describe('<Pickitem />', () => {
	it('renders a basic example with no options', () => {
		const basic = renderer.create(<Pickitem id="item1">Item 1</Pickitem>);
		expect(basic).toMatchSnapshot();
	});

	it('renders a small pickitem with highlighting', () => {
		const small = renderer.create(<Pickitem isHighlighted={true} size="small" id="item1">Item 1</Pickitem>);
		expect(small).toMatchSnapshot();
	});

	it('renders an xsmall pickitem with selected & invalid state', () => {
		const xsmall = renderer.create(<Pickitem isSelected isInvalid size="xsmall" id="item1">Item 1</Pickitem>);
		expect(xsmall).toMatchSnapshot();
	});

	it('renders a pickitem with most compatible options', () => {
		const allOptions = renderer.create(
			<Pickitem
				className="custom-classname"
				size="xsmall"
				id="item1"
				leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
				rightElement={<XUIIcon icon={arrow} />}
				primaryElement="Item 1"
				secondaryElement="Here is a bunch of secondary text"
				headingElement="Item 1 heading"
				pinnedElement="234"
				isSelected
				isInvalid
				isDisabled
				isMultiline
			/>
		);
		expect(allOptions).toMatchSnapshot();
	});

	it('should set an automation id when a qaHook is provided', () => {
		const automationid = renderer.create(<Pickitem qaHook="test-pickitem" id="item1">Item 1</Pickitem>);
		expect(automationid).toMatchSnapshot();
	});

	it('renders a selected multiselect pickitem (overriding leftElement)', () => {
		const multiselect = renderer.create(
			<Pickitem
				className="custom-classname"
				id="item1"
				isMultiselect
				isSelected
				leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
				primaryElement="Item 1"
			/>
		);
		expect(multiselect).toMatchSnapshot();
	});

	it('renders a selected multiselect pickitem without selected styles', () => {
		const multiselect = renderer.create(
			<Pickitem
				id="item1"
				isMultiselect
				isSelected
				disableSelectedStyles
				primaryElement="Item 1"
			/>
		);
		expect(multiselect).toMatchSnapshot();
	});

	it('renders a regular pickitem with truncation', () => {
		const truncation = renderer.create(
			<Pickitem
				id="item1"
				primaryElement="Item 1"
				secondaryElement="Here is a bunch of secondary text"
				pinnedElement="234"
				shouldTruncate
			/>
		);
		expect(truncation).toMatchSnapshot();
	});

	it('renders a multiselect pickitem with truncation', () => {
		const truncation = renderer.create(
			<Pickitem
				id="item1"
				primaryElement="Item 1"
				secondaryElement="Here is a bunch of secondary text"
				pinnedElement="234"
				isMultiselect
				shouldTruncate
			/>
		);
		expect(truncation).toMatchSnapshot();
	});
})

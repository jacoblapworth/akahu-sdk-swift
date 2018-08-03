import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAutocompleterSecondarySearch from '../XUIAutocompleterSecondarySearch';
import XUILoader from '../../loader/XUILoader';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import Pill from '../../pill/XUIPill';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testDropdownId');

Enzyme.configure({ adapter: new Adapter() });

const trigger = <button>trigger</button>;
const createComponent = props => (

	<XUIAutocompleterSecondarySearch
	trigger={trigger}
	{...props}
	>
		<Picklist>
			<Pickitem id='1'>item 1</Pickitem>
			<Pickitem id='2'>item 2</Pickitem>
		</Picklist>
	</XUIAutocompleterSecondarySearch>
)

describe('<XUIAutoCompleterSecondarySearch />', () => {
	it('should render an automation id when a qahook is passed', () => {
		const automationid = renderer.create(createComponent({ qaHook: 'secondary-search' }));

		expect(automationid).toMatchSnapshot();
	});

	it('should render extra classes when passed to the className prop', () => {
		const classComp = renderer.create(createComponent({ className: 'secondary-search-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render extra classes to the input when passed to the inputclassName prop', () => {
		const classComp = renderer.create(createComponent({ inputclassName: 'input-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render extra classes to the dropdown when passed to the dropdownClassName prop', () => {
		const classComp = renderer.create(createComponent({ dropdownClassName: 'dropdown-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('displays a XUILoader when loading is true', () => {
		const wrapper = mount(createComponent({loading: true}));

		expect(wrapper.find(XUILoader)).toBeDefined();
		expect(wrapper.prop('loading')).toBeTruthy();
	});

	it('renders with loading as false by default', () => {
		const wrapper = mount(createComponent());
		expect(wrapper.prop('loading')).toBeFalsy();
	});

	it('should render a placeholder inside the input when passed in', () => {
		const comp = renderer.create(createComponent({ placeholder: "Search" }));

		expect(comp).toMatchSnapshot();
	});

	it('should render as disabled when isDisabled prop is true', () => {
		const disabled = renderer.create(createComponent({ isDisabled: true }));

		expect(disabled).toMatchSnapshot();
	});

	it('should render an id on the dropdown node when passed in the id prop', () => {
		const classComp = renderer.create(createComponent({ id: 'test-id' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render an id on the input when a value is passed to the inputId prop', () => {
		const inputId = renderer.create(createComponent({ inputId: 'test-inputId' }));

		expect(inputId).toMatchSnapshot();
	});

	it('renders pills as children passed in through the pills prop', () => {
		const wrapper = mount(createComponent({ pills: <Pill value="ABC" /> }));

		expect(wrapper.find(Pill)).toBeDefined();
	});

	it('should call the onOpen callback when the dropdown is opened', () => {
		const onOpen = jest.fn();
		const wrapper = mount(createComponent({ onOpen: onOpen }));

		wrapper.instance().openDropDown();

		expect(onOpen.mock.calls.length).toEqual(1);
	});

	// Skipped until we can work around rending content with portals in tests.
	it.skip('should call onSearch when a search is done', () => {
		const onSearch = jest.fn();
		const searchComp = mount(createComponent({onSearch: onSearch, value: 'old value'}));

		// Simulate opening the dropdown
		searchComp.find('button').simulate('click')

		// Simulate changigns the value of the input field
		searchComp.find('input').simulate('change', {
			target: {
				value: 'new value'
			}
		});

		expect(onSearch.mock.calls.length).toEqual(1);
	});

	it('should pass the isBlock prop to the DropdownToggled element', () => {
		const searchComp = mount(createComponent({ isBlock: true }));

		const dropdownToggledComp = searchComp.find('DropDownToggled');

		expect(dropdownToggledComp.prop('isBlock')).toBeTruthy();
	});
});

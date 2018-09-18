import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAutocompleter from '../XUIAutocompleter';
import XUIPill from '../../pill/XUIPill';
import Picklist from '../../picklist/Picklist';
import Pickitem from '../../picklist/Pickitem';
import XUILoader from '../../loader/XUILoader';
import DropDownToggled from '../../dropdown/DropDownToggled';
import DropDownLayout from '../../dropdown/DropDownLayout';
import uuidv4 from 'uuid/v4';

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testAutocompleterId');

Enzyme.configure({ adapter: new Adapter() });

describe('XUIAutocompleter', () => {
	const createComponent = (props) => (
		<XUIAutocompleter
			dropdownSize="medium"
			forceDesktop
			{...props}
		>
			<Picklist>
				<Pickitem id="item1">Item 1</Pickitem>
				<Pickitem id="item2">Item 2</Pickitem>
			</Picklist>
		</XUIAutocompleter>
	);

	it('has data-automationid set on the input, list, dropdown and container', () => {
		const automationid = renderer.create(createComponent({ qaHook: "baseAC" }));

		expect(automationid).toMatchSnapshot();
	});

	it('inserts the searchValue inside the input', () => {
		const inputEl = renderer.create(createComponent({searchValue: "a"}));

		expect(inputEl).toMatchSnapshot();
	});

	it('renders with the provided label', () => {
		const inputEl = renderer.create(createComponent({inputLabelText: "Im a little label"}));

		expect(inputEl).toMatchSnapshot();
	});

	it('renders with a hidden label', () => {
		const inputEl = renderer.create(createComponent({inputLabelText: "Im a little label", isInputLabelHidden: true}));

		expect(inputEl).toMatchSnapshot();
	});

	it('fires the onSearch callback when the input value has changed', () => {
		const onSearch = jest.fn();
		const searchComp = mount(createComponent({onSearch: onSearch, searchValue: 'z' }))

		searchComp.find('input').simulate('change', {
			target: {
				value: 'a'
			}
		});

		expect(onSearch.mock.calls.length).toEqual(1);
	});

	it('renders with loading as false by default', () => {
		const wrapper = mount(createComponent());
		expect(wrapper.prop('loading')).toBeFalsy();
	});

	it('displays a XUILoader when loading is true', () => {
		const wrapper = mount(createComponent({loading: true}));

		expect(wrapper.find(XUILoader)).toBeDefined();
		expect(wrapper.prop('loading')).toBeTruthy();
	});

	it('renders pills as children passed in through the pills prop', () => {
		const wrapper = mount(createComponent({ pills: <XUIPill value="ABC" /> }));

		expect(wrapper.find(XUIPill)).toBeDefined();
	});

	it('opens the dropdown when we trigger `openDropDown` and closes the dropdown when we trigger `closeDropDown`', () => {
		const wrapper = mount(createComponent());
		expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();

		wrapper.instance().openDropDown();
		expect(wrapper.instance().ddt.state.isHidden).toBeFalsy()

		wrapper.instance().closeDropDown();
		expect(wrapper.instance().ddt.state.isHidden).toBeTruthy();
	});

	it('sets the dropdown to match trigger width if no dropdownSize is provided in the component props', () => {
		const wrapper = mount(createComponent({ dropdownSize: null }));
		expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeTruthy();
	});

	it('when disableWrapPills prop is applied disable pillwrap class is applied', () => {
		const wrapper = mount(createComponent());
		expect(wrapper.find('.xui-autocompleter--trigger-nopillwrap').length).toEqual(0);

		const disableWrapPills = mount(createComponent({ disableWrapPills: true, pills: [<XUIPill value="test" key="1" />] }));
		expect(disableWrapPills.find('.xui-autocompleter--pills-nopillwrap').length).toEqual(1);
	});

	it('should not add padding classes to the input when pills prop is an empty array', () => {
		const classComp = renderer.create(createComponent({ pills: [] }));

		expect(classComp).toMatchSnapshot();
	})

	it('should render a class on the root node when passed in the className prop', () => {
		const classComp = renderer.create(createComponent({ className: 'test-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render a class on the input element when passed in the inputClassName prop', () => {
		const classComp = renderer.create(createComponent({ inputClassName: 'test-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render a class on the trigger element when passed in the triggerClassName prop', () => {
		const classComp = renderer.create(createComponent({ triggerClassName: 'test-class' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render an id on the root node when passed in the id prop', () => {
		const classComp = renderer.create(createComponent({ id: 'test-id' }));

		expect(classComp).toMatchSnapshot();
	});

	it('should render an id on the input when a value is passed to the inputId prop', () => {
		const inputId = renderer.create(createComponent({ inputId: 'test-inputId' }));

		expect(inputId).toMatchSnapshot();
	});

	it('should render a placeholder inside the input when passed in', () => {
		const comp = renderer.create(createComponent({ placeholder: "Search" }));

		expect(comp).toMatchSnapshot();
	});

	it('should respect a max length of the input value when the maxLength has a value', () => {
		const maxLength = renderer.create(createComponent({ maxLength: 5, searchValue: '123456' }));

		expect(maxLength).toMatchSnapshot();
	});

	it('should render as disabled when isDisabled prop is true', () => {
		const disabled = renderer.create(createComponent({ isDisabled: true }));

		expect(disabled).toMatchSnapshot();
	});

	it('should ignore keyboard events for space as it\'s reserved for input interactions', () => {
		const comp = mount(createComponent());

		comp.find('input').simulate('keyDown', {
			keyCode: 32,
			which: 32
		});

		expect(comp.instance().ddt.state.isHidden).toBeTruthy();
	});

	it('should ignore keyboard events for the left arrow as it\'s reserved for input interactions', () => {
		const comp = mount(createComponent());

		comp.find('input').simulate('keyDown', {
			keyCode: 37,
			which: 37
		});

		expect(comp.instance().ddt.state.isHidden).toBeTruthy();
	});

	it('should ignore keyboard events for the right arrow as it\'s reserved for input interactions', () => {
		const comp = mount(createComponent());

		comp.find('input').simulate('keyDown', {
			keyCode: 39,
			which: 39
		});

		expect(comp.instance().ddt.state.isHidden).toBeTruthy();
	});

	describe.skip('Dropdown + Portal skipped tests', () => {
		it('uses the correct size variant if one is defined and doesn\'t try match trigger width', () => {
			const wrapper = mount(createComponent());
			expect(wrapper.find(DropDownLayout).props().size).toBe('medium');
			expect(wrapper.find(DropDownToggled).props().matchTriggerWidth).toBeFalsy();
		});
	});
});

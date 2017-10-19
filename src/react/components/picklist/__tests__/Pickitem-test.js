import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Picklist from '../Picklist';
import Pickitem from '../Pickitem';
import PickitemBody from '../PickitemBody';
import div from './helpers/container';

Enzyme.configure({ adapter : new Adapter() });

describe('<Pickitem />', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<Picklist>
				<Pickitem id="item1">Item 1</Pickitem>
				<Pickitem id="item2" href="http://xero.com">Xero link</Pickitem>
			</Picklist>,
			{ attachTo: div }
		);
	});

	it('renders with `xui-pickitem` as the class ', () => {
		expect(wrapper.find(Picklist)).toBeDefined();
		expect(wrapper.find('.xui-pickitem')).toHaveLength(2);
	});

	it('renders with aria-selected as false and no selected class', () => {
		const item = wrapper.find(Picklist).first();
		const isSelectClassPresent = item.hasClass('xui-pickitem-is-selected');
		const isSelectAttributePresent = item.html().includes('aria-selected="true"');

		expect(isSelectAttributePresent).toBeFalsy();
		expect(isSelectClassPresent).toBeFalsy();
	});

	it('contains role of `option`', () => {
		expect(wrapper.find(Picklist).first().html().includes('role="option"')).toBeTruthy();
	});

	//Skipped until we have the class in XUI
	it('renders with the hovered class when isHighlighted is true', () => {
		const wrapper = mount(
			<Picklist>
				<Pickitem isHighlighted={true} id="item1">Item 1</Pickitem>
				<Pickitem id="item2" href="http://xero.com">Xero link</Pickitem>
			</Picklist>,
			{attachTo: div}
		);

		expect(wrapper.find(Picklist).first().html().includes('xui-pickitem-is-hovered')).toBeTruthy();

	});

	it('applies disabled styles when the "isDisabled" prop is set to true', () => {
		const wrapper = mount(
			<Picklist>
				<Pickitem id="item1" isDisabled={true}> Disabled Item </Pickitem>
			</Picklist>
		);

		expect(wrapper.find(Pickitem).html().includes('xui-is-disabled')).toBeTruthy();
	});

	it('is not disabled by default', () => {
		expect(wrapper.find(Picklist).first().html().includes('xui-is-disabled')).toBeFalsy();
	});

	describe('One item selected', () => {
		let selectedItem;
		let nonSelectedItem;
		beforeEach(() => {
			wrapper = mount(
				<Picklist>
					<Pickitem isSelected={true} id="item1" multiselect={true}>Selected Item</Pickitem>
					<Pickitem id="item2">Non-selected Item</Pickitem>
				</Picklist>,
				{attachTo: div}
			);
			selectedItem = wrapper.find(Picklist).first();
			nonSelectedItem = wrapper.find(Pickitem).at(1);
		});

		it('renders with the selected class and aria-selected attribute when isSelected is true and the pickitem is multiselect', () => {
			expect(selectedItem.html().includes('xui-pickitem-is-selected')).toBeTruthy();
			expect(selectedItem.html().includes('aria-selected="true"')).toBeTruthy();
		});

		it('doesn\'t render an aria-selected attribute for Pickitems that are not multiselect', () => {
			expect(nonSelectedItem.html().includes('aria-selected')).toBeFalsy();
		});
	});

	describe('multiselect', () => {
		beforeEach(() => {
			wrapper = mount(
				<Picklist>
					<Pickitem id='multiselectItem1' className="item" disableSelectedStyles={true} multiselect={true}>
						Selectable Item 1
					</Pickitem>
					<Pickitem isSelected={true} id='multiselectItem2' disableSelectedStyles={true} multiselect={true}>
						Selectable Item 2
					</Pickitem>
				</Picklist>,
				{ attachTo: div });
		});

		it('doesn\'t apply the styles for selected items when the prop disableSelectedStyles is true', () => {
			expect(wrapper.find(Picklist).first().html().includes('xui-pickitem-is-selected')).toBeFalsy();
		});

		it('will retain the `aria-selected` value when the disableSelectedStyles prop and isSelected prop are both true', () => {
			expect(wrapper.find(Pickitem).at(1).html().includes('aria-selected="true"')).toBeTruthy();
		});

		it('inserts a checkbox as a child of the Pickitem when multiselect is true', () => {
			const checkbox = wrapper.find('input[type="checkbox"]');

			expect(checkbox).toBeDefined();
			expect(checkbox.length).toEqual(2);
		});

		it('includes the class "xui-pickitem--multiselect-label" around the picklist content', () => {
			const pickitem = wrapper.find('#multiselectItem2');

			expect(pickitem.find('xui-pickitem--multiselect-label')).toBeDefined();
		})
	})
})

describe('<PickitemBody />', () => {
	it('creates a button by default', () => {
		const wrapper = mount(<PickitemBody isSelected>Item</PickitemBody>);
		expect(wrapper.find('.xui-pickitem--body').type()).toEqual('button')
	});

	it('creates an `a` tag when href is provided', () => {
		const wrapper = mount(<PickitemBody isSelected href="https://xero.com">Item</PickitemBody>);
		expect(wrapper.find('.xui-pickitem--body').type()).toEqual('a');
	});
});

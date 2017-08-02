import React from 'react';
import { mount } from 'enzyme';
import DropDown from '../DropDown';
import { maxWidthDropdownSizes, fixedWidthDropdownSizes } from '../private/constants';

describe('<DropDown size classes />', () => {

	Object.keys(maxWidthDropdownSizes).forEach(size => {
		it(`${size} outputs max-width class by default`, () => {
			const wrapper = mount(<DropDown size={size}><strong>test</strong></DropDown>);
			expect(wrapper.getDOMNode().classList.contains(maxWidthDropdownSizes[size])).toBeTruthy();
		});

		it(`${size} outputs fixed-width class when fixedWidth prop is set`, () => {
			const wrapper = mount(<DropDown size={size} fixedWidth><strong>test</strong></DropDown>);
			expect(wrapper.getDOMNode().classList.contains(fixedWidthDropdownSizes[size])).toBeTruthy();
		});
	});

});

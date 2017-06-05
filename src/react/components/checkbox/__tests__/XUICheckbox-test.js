/* global describe, beforeEach, it */
import React from 'react';
import { expect } from 'chai';
import XUICheckbox from '../XUICheckbox.js';
import star from '@xero/xui-icon/icons/star';
import contact from '@xero/xui-icon/icons/contact';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import checkboxIndeterminate from '@xero/xui-icon/icons/checkbox-indeterminate';
import checkboxMain from '@xero/xui-icon/icons/checkbox-main';

import div from './helpers/container';

import { mount } from 'enzyme';

const NOOP = () => {};

describe('XUICheckbox', function() {
	let wrapper;
	let node;
	let input;
	//<use /> tags
	let focus;
	let main;
	let check;
	let indeterminate;

	beforeEach( () => {
		wrapper = mount(
			<XUICheckbox
				onChange={NOOP}
				className="dogs-are-totes-patotes"
				qaHook="cheese-and-crackers"
				iconMainPath={star}
			>
				Howdy, folks!
			</XUICheckbox>, { attachTo: div });
		input = wrapper.find('input');
		node = input.node;
	});

	it('should be of type checkbox', () => {
		expect(node.type).to.equal('checkbox');
	});

	it('should have label text if provided', () => {
		expect(node.innerHTML, 'Howdy, folks!');
	});

	it('should use additional classes on the root node if provided', () => {
		expect(wrapper.find('label').hasClass('dogs-are-totes-patotes')).to.be.true;
	});

	it('should have a qaHook on the root node if provided', function () {
		expect(wrapper.find('[data-automationid="cheese-and-crackers"]').node).to.exist;
	});

	it('should use the xui-icon class on the SVG element', () => {
		expect(wrapper.find('svg').hasClass('xui-icon')).to.be.true;
	});

	it('should define role as presentation on each use element', () => {
		const wrapper = mount(
			<XUICheckbox onChange={NOOP}>
				Howdy, folks!
			</XUICheckbox>, { attachTo: div }
		);

		focus = wrapper.find('.xui-styledcheckbox--focus').node;
		main = wrapper.find('.xui-styledcheckbox--main').node;
		check = wrapper.find('.xui-styledcheckbox--check').node;
		indeterminate = wrapper.find('.xui-styledcheckbox--indeterminate').node;

		expect(focus.getAttribute('role')).to.equal('presentation');
		expect(main.getAttribute('role')).to.equal('presentation');
		expect(check.getAttribute('role')).to.equal('presentation');
		expect(indeterminate.getAttribute('role')).to.equal('presentation');
	});

	it('should be unchecked by default', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} />);

		const node = wrapper.find('input').node;
		expect(node.checked).to.be.false;
	});

	it('should be selected and disabled if isChecked and isDisabled are both true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isChecked={true} isDisabled={true} />);

		const node = wrapper.find('input').node;
		expect(node.checked, 'checked is not true').to.be.true;
		expect(node.disabled, 'disabled is not set as true').to.be.true;
	});


	it('should be indeterminate if isIndeterminate is true', () => {
		mount(<XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />, {attachTo: div});

		//haven't been able to use wrapper.find as we need a true DOM representation to find the property.
		const node = document.querySelector('.indeterminate input');
		expect(node.indeterminate).to.be.true;
	});


	it('should update the indeterminate property when isIndeterminate changes state', () => {
		const wrapper = mount(<XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />, {attachTo: div});

		//haven't been able to use wrapper.find as we need a true DOM representation to find the property.
		const node = document.querySelector('.indeterminate input');

		expect(node).to.exist;
		expect(node.indeterminate).to.be.true;

		wrapper.setProps({isIndeterminate : false});

		expect(node.indeterminate).to.be.false;
	});


	it('should be required for form submission if isRequired is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isRequired={true} />);

		const node = wrapper.find('input');
		expect(node.props().required).to.be.true;
	});

	it('should use the xui-styledcheckbox-reverse class on the root node if isReversed is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isReversed={true} />);

		expect(wrapper.find('label').hasClass('xui-styledcheckbox-reversed')).to.be.true;
	});

	it('should have the correct name if one is provided', function () {
		const wrapper = mount(<XUICheckbox onChange={NOOP} name="Patrick" />);

		const node = wrapper.find('input');
		expect(node.props().name).to.equal('Patrick');
	});

	it('should call the provided onChange function every time the control changes state', () => {
		let toggle = false;
		const wrapper = mount(<XUICheckbox onChange={() => {toggle = !toggle}} />);

		const node = wrapper.find('input');

		node.simulate('change');
		expect(toggle).to.be.true;
		node.simulate('change');
		expect(toggle).to.be.false;
	});

	it('should have the correct value if one is provided', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} value="64" />);
		expect(wrapper.find('input[type="checkbox"]').props().value).to.equal('64');
	});

	it('should allow setting a custom tabIndex on the input', function () {
		const wrapper = mount(
			<XUICheckbox onChange={NOOP} tabIndex={-1}>
				Howdy, folks!
			</XUICheckbox>, {attachTo: div}
		);
		expect(wrapper.find('input[type="checkbox"]').props().tabIndex).to.equal(-1);
	});

	it('should not display label if isLabelHidden is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isLabelHidden={true} />);
		const node = wrapper.find('span');

		expect(node.node).to.be.undefined;
	});

	///ICON COMBINATORS
	describe('icon combinations', () => {
		let wrapper;

		const standardResults = (wrapper, variants = {
			focus: checkboxMain,
			main: checkboxMain,
			check: checkboxCheck,
			indeterminate: checkboxIndeterminate
		}) => {

			if(variants.focus) {
				focus = wrapper.find('.xui-styledcheckbox--focus').node;
				expect(focus.getAttribute('d')).to.equal(variants.focus);
			}

			if(variants.main){
				main = wrapper.find('.xui-styledcheckbox--main').node;
				expect(main.getAttribute('d')).to.equal(variants.main);
			}

			if(variants.check){
				check = wrapper.find('.xui-styledcheckbox--check').node;
				expect(check.getAttribute('d')).to.equal(variants.check);
			}

			if(variants.indeterminate){
				indeterminate = wrapper.find('.xui-styledcheckbox--indeterminate').node;
				expect(indeterminate.getAttribute('d')).to.equal(variants.indeterminate);
			}

		};

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: checkbox-check, iconIndeterminatePath: checkbox-indeterminate by default', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP}/>);
			standardResults(wrapper);
		});

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: checkbox-check, iconIndeterminatePath: checkbox-indeterminate if all icons are null values', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={null} iconCheckPath={null} iconIndeterminatePath={null} />);
			standardResults(wrapper);
		});

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: checkbox-check, iconIndeterminatePath: checkbox-indeterminate when iconIndeterminate is null', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconIndeterminatePath={null}/>);
			standardResults(wrapper);
		});

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: checkbox-check, iconIndeterminatePath: checkbox-contact when iconIndeterminatePath is contact icon path', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconIndeterminatePath={contact} />);
			standardResults(wrapper, {indeterminate: contact});
		});

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: checkbox-check, iconIndeterminatePath: checkbox-indeterminate when iconCheckPath is null', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconCheckPath={null}/>);
			standardResults(wrapper);
		});

		it('use icons - iconMainPath: checkbox-main, iconCheckPath: radio-check, iconIndeterminatePath: checkbox-indeterminate when iconCheckPath is contact icon path', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconCheckPath={contact}/>);
			standardResults(wrapper, {check: contact});
		});

		it('use icons - iconMainPath: icon-main, iconCheckPath: none, iconIndeterminatePath: none when iconMainPath is star', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} />);

			focus = wrapper.find('.xui-styledcheckbox--focus').node;
			main = wrapper.find('.xui-styledcheckbox--main').node;

			standardResults(wrapper, {
				focus: star,
				main: star
			});

			expect(wrapper.find('svg').node.childNodes.length).to.equal(2);
		});

		it('use icons - iconMainPath: star, iconCheckPath: null, iconIndeterminatePath: contact when an Indeterminate icon path is supplied with iconMainPath', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminatePath={contact} />);

			focus = wrapper.find('.xui-styledcheckbox--focus').node;
			main = wrapper.find('.xui-styledcheckbox--main').node;
			indeterminate = wrapper.find('.xui-styledcheckbox--indeterminate').node;

			standardResults(wrapper, {
				focus: star,
				main: star,
				indeterminate: contact
			});

			expect(wrapper.find('svg').node.childNodes.length).to.equal(3);
		});

		it('use icons - iconMainPath: star, iconCheckPath: null, iconIndeterminatePath: null when null is passed to iconIndeterminatePath or iconCheck', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminate={null} iconCheck={null} />);

			focus = wrapper.find('.xui-styledcheckbox--focus').node;
			main = wrapper.find('.xui-styledcheckbox--main').node;

			standardResults(wrapper, {
				focus: star,
				main: star
			});
			expect(wrapper.find('svg').node.childNodes.length).to.equal(2);
		});

		it('use icons - iconMainPath: star, iconCheckPath: contact, iconIndeterminatePath: null', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminatePath={null} iconCheckPath={contact} />);

			focus = wrapper.find('.xui-styledcheckbox--focus').node;
			main = wrapper.find('.xui-styledcheckbox--main').node;
			check = wrapper.find('.xui-styledcheckbox--check').node;

			standardResults(wrapper, {
				focus: star,
				main: star,
				check: contact
			});
			expect(wrapper.find('svg').node.childNodes.length).to.equal(3);
		});

		it('use icons - iconMainPath: star, iconCheckPath: contact, iconIndeterminatePath: contact when a value is supplied to each icon', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconCheckPath={contact} iconIndeterminatePath={contact}  />);

			const variants = {
				check: contact,
				main: star,
				focus: star,
				indeterminate: contact
			};

			standardResults(wrapper, variants);
		});
	});
});

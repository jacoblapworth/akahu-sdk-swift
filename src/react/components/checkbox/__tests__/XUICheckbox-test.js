import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import star from '@xero/xui-icon/icons/star';
import contact from '@xero/xui-icon/icons/contact';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import checkboxIndeterminate from '@xero/xui-icon/icons/checkbox-indeterminate';
import checkboxMain from '@xero/xui-icon/icons/checkbox-main';
import XUICheckbox from '../XUICheckbox';

import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

describe('XUICheckbox', function() {
	let wrapper;
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
	});

	it('should be of type checkbox', () => {
		expect(input.instance().type).toEqual('checkbox');
	});

	it('should have label text if provided', () => {
		expect(wrapper.find('label').text()).toEqual('Howdy, folks!');
	});

	it('should use additional classes on the root node if provided', () => {
		expect(wrapper.find('label').hasClass('dogs-are-totes-patotes')).toBeTruthy();
	});

	it('should have a qaHook on the root node if provided', function () {
		expect(wrapper.find('[data-automationid="cheese-and-crackers"]').instance()).toBeDefined();
	});

	it('should use the xui-icon class on the SVG element', () => {
		expect(wrapper.find('svg').hasClass('xui-icon')).toBeTruthy();
	});

	it('should define role as presentation on each use element', () => {
		const wrapper = mount(
			<XUICheckbox onChange={NOOP}>
				Howdy, folks!
			</XUICheckbox>, { attachTo: div }
		);

		focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
		main = wrapper.find('.xui-styledcheckboxradio--main').instance();
		check = wrapper.find('.xui-styledcheckboxradio--check').instance();
		indeterminate = wrapper.find('.xui-styledcheckboxradio--indeterminate').instance();

		expect(focus.getAttribute('role')).toEqual('presentation');
		expect(main.getAttribute('role')).toEqual('presentation');
		expect(check.getAttribute('role')).toEqual('presentation');
		expect(indeterminate.getAttribute('role')).toEqual('presentation');
	});

	it('should be unchecked by default', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} />);

		const node = wrapper.find('input').instance();
		expect(node.checked).toBeFalsy();
	});

	it('should be selected and disabled if isChecked and isDisabled are both true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isChecked={true} isDisabled={true} />);

		const node = wrapper.find('input').instance();
		expect(node.checked).toBeTruthy();
		expect(node.disabled).toBeTruthy();
	});


	it('should be indeterminate if isIndeterminate is true', () => {
		mount(<XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />, {attachTo: div});

		//haven't been able to use wrapper.find as we need a true DOM representation to find the property.
		const node = document.querySelector('.indeterminate input');
		expect(node.indeterminate).toBeTruthy();
	});


	it('should update the indeterminate property when isIndeterminate changes state', () => {
		const wrapper = mount(<XUICheckbox className="indeterminate" onChange={NOOP} isIndeterminate={true} />, {attachTo: div});

		//haven't been able to use wrapper.find as we need a true DOM representation to find the property.
		const node = document.querySelector('.indeterminate input');

		expect(node).toBeDefined();
		expect(node.indeterminate).toBeTruthy();

		wrapper.setProps({isIndeterminate : false});

		expect(node.indeterminate).toBeFalsy();
	});


	it('should be required for form submission if isRequired is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isRequired={true} />);

		const node = wrapper.find('input');
		expect(node.props().required).toBeTruthy();
	});

	it('should use the xui-styledcheckboxradio-reverse class on the root node if isReversed is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isReversed={true} />);

		expect(wrapper.find('label').hasClass('xui-styledcheckboxradio-reversed')).toBeTruthy();
	});

	it('should have the correct name if one is provided', function () {
		const wrapper = mount(<XUICheckbox onChange={NOOP} name="Patrick" />);

		const node = wrapper.find('input');
		expect(node.props().name).toEqual('Patrick');
	});

	it('should call the provided onChange function every time the control changes state', () => {
		let toggle = false;
		const wrapper = mount(<XUICheckbox onChange={() => {toggle = !toggle}} />);

		const node = wrapper.find('input');

		node.simulate('change');
		expect(toggle).toBeTruthy();
		node.simulate('change');
		expect(toggle).toBeFalsy();
	});

	it('should have the correct value if one is provided', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} value="64" />);
		expect(wrapper.find('input[type="checkbox"]').props().value).toEqual('64');
	});

	it('should allow setting a custom tabIndex on the input', function () {
		const wrapper = mount(
			<XUICheckbox onChange={NOOP} tabIndex={-1}>
				Howdy, folks!
			</XUICheckbox>, {attachTo: div}
		);
		expect(wrapper.find('input[type="checkbox"]').props().tabIndex).toEqual(-1);
	});

	it('should not display label if isLabelHidden is true', () => {
		const wrapper = mount(<XUICheckbox onChange={NOOP} isLabelHidden={true} />);
		const nodes = wrapper.find('span');

		expect(nodes.length).toBe(0);
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
				focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
				expect(focus.getAttribute('d')).toEqual(variants.focus);
			}

			if(variants.main){
				main = wrapper.find('.xui-styledcheckboxradio--main').instance();
				expect(main.getAttribute('d')).toEqual(variants.main);
			}

			if(variants.check){
				check = wrapper.find('.xui-styledcheckboxradio--check').instance();
				expect(check.getAttribute('d')).toEqual(variants.check);
			}

			if(variants.indeterminate){
				indeterminate = wrapper.find('.xui-styledcheckboxradio--indeterminate').instance();
				expect(indeterminate.getAttribute('d')).toEqual(variants.indeterminate);
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

			focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
			main = wrapper.find('.xui-styledcheckboxradio--main').instance();

			standardResults(wrapper, {
				focus: star,
				main: star
			});

			expect(wrapper.find('svg').instance().childNodes.length).toEqual(2);
		});

		it('use icons - iconMainPath: star, iconCheckPath: null, iconIndeterminatePath: contact when an Indeterminate icon path is supplied with iconMainPath', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminatePath={contact} />);

			focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
			main = wrapper.find('.xui-styledcheckboxradio--main').instance();
			indeterminate = wrapper.find('.xui-styledcheckboxradio--indeterminate').instance();

			standardResults(wrapper, {
				focus: star,
				main: star,
				indeterminate: contact
			});

			expect(wrapper.find('svg').instance().childNodes.length).toEqual(3);
		});

		it('use icons - iconMainPath: star, iconCheckPath: null, iconIndeterminatePath: null when null is passed to iconIndeterminatePath or iconCheck', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminate={null} iconCheck={null} />);

			focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
			main = wrapper.find('.xui-styledcheckboxradio--main').instance();

			standardResults(wrapper, {
				focus: star,
				main: star
			});
			expect(wrapper.find('svg').instance().childNodes.length).toEqual(2);
		});

		it('use icons - iconMainPath: star, iconCheckPath: contact, iconIndeterminatePath: null', () => {
			wrapper = mount(<XUICheckbox onChange={NOOP} iconMainPath={star} iconIndeterminatePath={null} iconCheckPath={contact} />);

			focus = wrapper.find('.xui-styledcheckboxradio--focus').instance();
			main = wrapper.find('.xui-styledcheckboxradio--main').instance();
			check = wrapper.find('.xui-styledcheckboxradio--check').instance();

			standardResults(wrapper, {
				focus: star,
				main: star,
				check: contact
			});
			expect(wrapper.find('svg').instance().childNodes.length).toEqual(3);
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

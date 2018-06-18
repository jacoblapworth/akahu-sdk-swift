import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIRadio from '../XUIRadio';
import radioMain from '@xero/xui-icon/icons/radio-main';
import radioCheck from '@xero/xui-icon/icons/radio-check';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import star from '@xero/xui-icon/icons/star';

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

describe('XUIRadio', () => {

	// type radio
	it('should be of type radio', () => {
		const component = shallow(<XUIRadio onChange={NOOP}/>);

		expect(component.find('input').prop('type')).toEqual('radio');
	});

	// styled div for html radio
	it('should contain a styled div, by default', () => {
		const component = shallow(<XUIRadio onChange={NOOP}/>);

		expect(component.find('div').hasClass('xui-styledcheckboxradio--radio')).toBeTruthy();
	});


	// children property (label text)
	it('should have label text if provided', () => {
		const component = shallow(<XUIRadio onChange={NOOP}>Howdy, folks!</XUIRadio>);

		expect(component.text()).toEqual('Howdy, folks!');
	});


	// className property (additional classes)
	it('should use additional classes on the root node if provided', () => {
		const component = shallow(<XUIRadio onChange={NOOP} className="dogs-are-totes-patotes" />);

		expect(component.hasClass('dogs-are-totes-patotes')).toBeTruthy();
	});


	// qaHook property
	it.skip('should have a qaHook on the root node if provided', () => {
		const component = renderer.create(<XUIRadio onChange={NOOP} qaHook="cheese-and-crackers" />);

		expect(component).toMatchSnapshot();
	});

	it('should have a hidden label, if specified', () => {
		const hiddenLabel = renderer.create(
			<XUIRadio onChange={NOOP} isLabelHidden>Hidden label</XUIRadio>
		);

		expect(hiddenLabel).toMatchSnapshot();
	});

	describe('icon combinations', () => {
		const defaultComponent = shallow(<XUIRadio onChange={NOOP} iconMainPath={radioMain} iconCheckPath={radioCheck}/>);
		// SVG element uses xui-icon class
		it('should use the xui-icon class on the SVG element', () => {
			expect(defaultComponent.find('svg').hasClass('xui-icon')).toBeTruthy();
		});


		// SVG path elements include role presentation
		it('should define role as presentation on each path element', () => {
			expect(defaultComponent.find('svg').childAt(0).prop('role')).toEqual('presentation')
			expect(defaultComponent.find('svg').childAt(1).prop('role')).toEqual('presentation')
			expect(defaultComponent.find('svg').childAt(2).prop('role')).toEqual('presentation')

		});


		// Icon combinatorics 1/9 (main: undefined, check: undefined)
		it('should not generate svgs if iconMainPath and iconCheckPath if both are undefined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} />);

			expect(component.find('svg').length).toEqual(0);
		});


		// Icon combinatorics 2/9 (main: undefined, check: null)
		it('should not generate svgs if iconMainPath is undefined and iconCheckPath is null', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconCheckPath={null} />);

			expect(component.find('svg').length).toEqual(0);
		});


		// Icon combinatorics 3/9 (main: undefined, check: checkbox-check)
		it('should use the default iconMainPath and a custom iconCheckPath if iconMainPath is undefined and iconCheckPath is defined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconCheckPath={checkboxCheck} />);

			expect(component.find('svg').childAt(0).prop('d')).toEqual(radioMain);
			expect(component.find('svg').childAt(1).prop('d')).toEqual(radioMain);
			expect(component.find('svg').childAt(2).prop('d')).toEqual(checkboxCheck);
		});


		// Icon combinatorics 4/9 (main: null, check: undefined)
		it('should not generate svgs if iconMainPath is null and iconCheckPath is undefined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={null} />);

			expect(component.find('svg').length).toEqual(0);
		});


		// Icon combinatorics 5/9 (main: null, check: null)
		it('should not generate svgs if both are null', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={null} iconCheckPath={null} />);

			expect(component.find('svg').length).toEqual(0);
		});


		// Icon combinatorics 6/9 (main: null, check: checkbox-check)
		it('should use the default iconMainPath and a custom iconCheckPath if iconMainPath is null and iconCheckPath is defined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={null} iconCheckPath={checkboxCheck} />);

			expect(component.find('svg').childAt(0).prop('d')).toEqual(radioMain);
			expect(component.find('svg').childAt(1).prop('d')).toEqual(radioMain);
			expect(component.find('svg').childAt(2).prop('d')).toEqual(checkboxCheck);
		});


		// Icon combinatorics 7/9 (main: star, check: undefined)
		it('should use a custom iconMainPath without a checkmark if iconMainPath is defined and iconCheckPath is undefined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={star} />);

			expect(component.find('svg').childAt(0).prop('d')).toEqual(star);
			expect(component.find('svg').childAt(1).prop('d')).toEqual(star);
			expect(component.find('svg').children().length).toEqual(2); //No checkmark path element
		});


		// Icon combinatorics 8/9 (main: star, check: null)
		it('should use a custom iconMainPath without a checkmark if iconMainPath is defined and iconCheckPath is null', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={star} iconCheckPath={null} />);

			expect(component.find('svg').childAt(0).prop('d')).toEqual(star);
			expect(component.find('svg').childAt(1).prop('d')).toEqual(star);
			expect(component.find('svg').children().length).toEqual(2); //No checkmark path element
		});


		// Icon combinatorics 9/9 (main: star, check: checkbox-check)
		it('should use a custom iconMainPath and a custom iconCheckPath if both are defined', () => {
			const component = shallow(<XUIRadio onChange={NOOP} iconMainPath={star} iconCheckPath={checkboxCheck} />);

			expect(component.find('svg').childAt(0).prop('d')).toEqual(star);
			expect(component.find('svg').childAt(1).prop('d')).toEqual(star);
			expect(component.find('svg').childAt(2).prop('d')).toEqual(checkboxCheck);
		});
	});


	// Unchecked
	it('should be unchecked by default', function () {
		const component = shallow(<XUIRadio onChange={NOOP} />);

		expect(component.html()).not.toContain('checked');
	});


	// isChecked property
	it('should be selected if isChecked is true', function () {
		const component = shallow(<XUIRadio onChange={NOOP} isChecked={true} />);

		expect(component.html()).toContain('checked');
	});


	// isDisabled property
	it('should be disabled if isDisabled is true', function () {
		const component = shallow(<XUIRadio onChange={NOOP} isDisabled={true} />);

		expect(component.html()).toContain('disabled');
	});


	// isChecked and isDisabled properties
	it('should be selected and disabled if isChecked and isDisabled are both true', function () {
		const component = shallow(<XUIRadio onChange={NOOP} isChecked={true} isDisabled={true} />);

		expect(component.html()).toContain('disabled');
		expect(component.html()).toContain('checked');
	});


	// isRequired property
	it('should be required for form submission if isRequired is true', function () {
		const component = shallow(<XUIRadio onChange={NOOP} isRequired={true} />);

		expect(component.html()).toContain('required');
	});


	// isReversed property
	it('should use the xui-styledcheckboxradio-reverse class on the root node if isReversed is true', function () {
		const component = shallow(<XUIRadio onChange={NOOP} isReversed={true} />);

		expect(component.hasClass('xui-styledcheckboxradio-reversed')).toBeTruthy();
	});


	// name property
	it('should have the correct name if one is provided', function () {
		const component = shallow(<XUIRadio onChange={NOOP} name="Patrick" />);

		expect(component.childAt(0).prop('name')).toEqual('Patrick');
	});


	// onChange property
	it('should call the provided onChange function every time the control changes state', function () {
		const callback = jest.fn();
		const component = shallow(<XUIRadio onChange={callback} />);

		component.find('input').simulate('change');
		expect(callback.mock.calls.length).toEqual(1);

	});


	// value property
	it('should have the correct value if one is provided', function () {
		const component = shallow(<XUIRadio onChange={NOOP} value="64" />);

		expect(component.childAt(0).prop('value')).toEqual('64');
	});

});

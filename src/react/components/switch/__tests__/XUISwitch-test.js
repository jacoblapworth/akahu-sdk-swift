import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUISwitch from '../XUISwitch';

const NOOP = () => {};

Enzyme.configure({ adapter: new Adapter() });

describe('XUISwitch', function () {

	it('should render not checked and not disabled', function () {
		const basic = renderer.create(<XUISwitch onChange={NOOP}/>);

		expect(basic).toMatchSnapshot();
	});

	it('should render checked', function () {
		const component = shallow(
			<XUISwitch isChecked={true} onChange={NOOP}/>
		);

		expect(component.html()).toContain('checked');
	});

	it('should pass a value to the input', function () {
		const component = shallow(
			<XUISwitch value="someValue" onChange={NOOP}/>
		);

		expect(component.childAt(0).props().value).toEqual('someValue');
	});

	it('should pass a name to the input', function () {
		const component = shallow(
			<XUISwitch name="someName" onChange={NOOP}/>
		);

		expect(component.find('input').props().name).toEqual('someName');
	});

	it('should be disabled', function () {
		const component = shallow(
			<XUISwitch name="someName" onChange={NOOP} isDisabled={true}/>
		);

		expect(component.html()).toContain('disabled');
	});

	it('should render an automationid when a qaHook value is passed', () => {
		const automationid = renderer.create(<XUISwitch qaHook="switch-test" onChange={NOOP}/>);

		expect(automationid).toMatchSnapshot();
	});

	it('should include a tex label when label is passed', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} labelId="testLabelId">Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

	it('should include an aria-label when label is passed and hidden', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} isLabelHidden>Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

	it('should include a reversed class when a text labe is present and isReversed is set', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} labelId="testLabelId" isReversed>Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

});

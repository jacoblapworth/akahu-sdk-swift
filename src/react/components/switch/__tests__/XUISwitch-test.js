import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUISwitch from '../XUISwitch';
import uuidv4 from 'uuid/v4';

const NOOP = () => {};

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4');
uuidv4.mockImplementation(() => 'testSwitchId');

describe('XUISwitch', function () {

	it('should render not checked and not disabled', function () {
		const basic = renderer.create(<XUISwitch onChange={NOOP}/>);

		expect(basic).toMatchSnapshot();
	});

	it('should render checked', function () {
		const component = renderer.create(
			<XUISwitch isChecked={true} onChange={NOOP}/>
		);

		expect(component).toMatchSnapshot();
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

	it('should render an automationid for most elements when a qaHook value is passed', () => {
		const automationid = renderer.create(<XUISwitch qaHook="switch-test" onChange={NOOP}>Switch test</XUISwitch>);

		expect(automationid).toMatchSnapshot();
	});

	it('should include a text label when label is passed', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} labelId="testLabelId">Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

	it('should include an aria-label when label is passed and hidden', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} isLabelHidden>Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

	it('should include a reversed class when a text label is present and isReversed is set', () => {
		const ariaLabel = renderer.create(<XUISwitch onChange={NOOP} labelId="testLabelId" isReversed>Switch test</XUISwitch>);

		expect(ariaLabel).toMatchSnapshot();
	});

});

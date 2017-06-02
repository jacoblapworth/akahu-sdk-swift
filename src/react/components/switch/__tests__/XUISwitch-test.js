import React from 'react';
import chai from 'chai';
import XUISwitch from '../XUISwitch';

const assert = chai.assert;
const TestUtils = require('react-dom/test-utils');

const onChange = () => {
	console.log('Value changed!!');
};

describe('XUISwitch', function () {

	it('should render not checked and not disabled', function () {
		const component = TestUtils.renderIntoDocument(
			<XUISwitch onChange={onChange}/>
		);

		const inputDOMElement = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

		const isChecked = inputDOMElement.checked;
		const isNotDisabled = inputDOMElement.disabled;

		assert.strictEqual(isChecked, false);
		assert.strictEqual(isNotDisabled, false);
	});

	it('should render checked', function () {
		const component = TestUtils.renderIntoDocument(
			<XUISwitch checked={true} onChange={onChange}/>
		);

		const isChecked = TestUtils.findRenderedDOMComponentWithTag(component, 'input').checked;

		assert.strictEqual(isChecked, true);
	});

	it('should pass a value to the input', function () {
		const component = TestUtils.renderIntoDocument(
			<XUISwitch value="someValue" onChange={onChange}/>
		);

		const value = TestUtils.findRenderedDOMComponentWithTag(
			component,
			'input').getAttribute('value');

		assert.strictEqual(value, "someValue");
	});

	it('should pass a name to the input', function () {
		const component = TestUtils.renderIntoDocument(
			<XUISwitch name="someName" onChange={onChange}/>
		);

		const value = TestUtils.findRenderedDOMComponentWithTag(component, 'input').getAttribute('name');

		assert.strictEqual(value, "someName");
	});

	it('should be disabled', function () {
		const component = TestUtils.renderIntoDocument(
			<XUISwitch name="someName" onChange={onChange} disabled={true}/>
		);

		const disabledState = TestUtils.findRenderedDOMComponentWithTag(component, 'input').disabled;

		assert.strictEqual(disabledState, true);
	});

});

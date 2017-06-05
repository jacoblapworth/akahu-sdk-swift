import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUICheckbox from '../XUICheckbox.js';
import XUICheckboxGroup from '../XUICheckboxGroup.js';

const assert = chai.assert;
const TestUtils = require('react-dom/test-utils');


const NOOP = () => {} // No operation function


describe('XUICheckboxGroup', function() {

	// children property checkboxes
	it('should contain XUICheckbox components if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUICheckboxGroup>
					<XUICheckbox onChange={NOOP} />
					<XUICheckbox onChange={NOOP} />
					<XUICheckbox onChange={NOOP} />
				</XUICheckboxGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		for (let i = 0; i < node.childNodes.length; i++) {
			let label = node.childNodes[i];
			assert.include(label.className, 'xui-styledcheckbox');
		}
	});


	// children property non-checkboxes
	it('should contain children regardless of type', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUICheckboxGroup>
					<div>dogs</div>
					<span>patotes</span>
					<label>cats</label>
				</XUICheckboxGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.querySelector('div').innerHTML, 'dogs');
		assert.strictEqual(node.querySelector('span').innerHTML, 'patotes');
		assert.strictEqual(node.querySelector('label').innerHTML, 'cats');
	});


	// className property (additional classes)
	it('should use additional classes if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUICheckboxGroup className="dogs-are-totes-patotes" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.className, 'dogs-are-totes-patotes xui-styledcheckbox-group');
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUICheckboxGroup qaHook="cheese-and-crackers" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.getAttribute('data-automationid'), 'cheese-and-crackers');
	});

});

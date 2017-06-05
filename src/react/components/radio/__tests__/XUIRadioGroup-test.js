import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import XUIRadio from '../XUIRadio.js';
import XUIRadioGroup from '../XUIRadioGroup.js';

const TestUtils = require('react-dom/test-utils');
const NOOP = () => {};

describe('XUIRadioGroup', function() {

	// children property radios
	it('should contain XUIRadio components if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadioGroup>
					<XUIRadio onChange={NOOP} />
					<XUIRadio onChange={NOOP} />
					<XUIRadio onChange={NOOP} />
				</XUIRadioGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		for (let i = 0; i < node.childNodes.length; i++) {
			let label = node.childNodes[i];
			assert.include(label.className, 'xui-styledradio');
		}
	});


	// children property non-radios
	it('should contain children regardless of type', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadioGroup>
					<div>dogs</div>
					<span>patotes</span>
					<label>cats</label>
				</XUIRadioGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.querySelector('div').textContent, 'dogs');
		assert.strictEqual(node.querySelector('span').textContent, 'patotes');
		assert.strictEqual(node.querySelector('label').textContent, 'cats');
	});


	// className property (additional classes)
	it('should use additional classes if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadioGroup className="dogs-are-totes-patotes" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.className, 'dogs-are-totes-patotes xui-styledradio-group');
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadioGroup qaHook="cheese-and-crackers" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.getAttribute('data-automationid'), 'cheese-and-crackers');
	});

});

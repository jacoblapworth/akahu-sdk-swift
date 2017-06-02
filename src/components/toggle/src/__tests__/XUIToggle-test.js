/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUIToggleOption from '../XUIToggleOption.js';
import XUIToggle from '../XUIToggle.js';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;


describe('XUIToggle', function() {

	// children property toggles
	it('should contain XUIToggleOption components if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle>
					<XUIToggleOption onChange={() => {}}/>
					<XUIToggleOption onChange={() => {}}/>
					<XUIToggleOption onChange={() => {}}/>
				</XUIToggle>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		for (let i = 0; i < node.childNodes.length; i++) {
			let label = node.childNodes[i];
			assert.include(label.className, 'xui-toggle-option');
		}
	});


	// children property non-toggles
	it('should contain children regardless of type', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle>
					<div>dogs</div>
					<span>patotes</span>
					<label>cats</label>
				</XUIToggle>
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
				<XUIToggle className="dogs-are-totes-patotes" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'dogs-are-totes-patotes');
	});


	// qaHook property
	it('should have a qaHook if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle qaHook="cheese-and-crackers" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.getAttribute('data-automationid'), 'cheese-and-crackers');
	});


	// color default
	it('should use the standard color by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-toggle-standard');
	});


	// color standard
	it('should use the standard color if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle color="standard"/>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-toggle-standard');
	});


	// color inverted
	it('should use the inverted color if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle color="inverted"/>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-toggle-inverted');
	});


	// layout fullwidth
	it('should use the fullwidth layout if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle layout="fullwidth"/>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-toggle-fullwidth-layout');
	});


	// layout icon
	it('should use the icon layout if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggle layout="icon"/>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-toggle-icon-layout');
	});

});

import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUIToggleOption from '../XUIToggleOption.js';


const assert = chai.assert;
const TestUtils = React.addons.TestUtils;


describe('XUIToggleOption', function() {

	// children property (label text)
	it('should have label text if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}}>Howdy, folks!</XUIToggleOption>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.lastChild;
		assert.strictEqual(node.innerHTML, 'Howdy, folks!');
	});


	// className property (additional classes)
	it('should use additional classes on the root node if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} className="dogs-are-totes-patotes" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'dogs-are-totes-patotes');
	});


	// qaHook property
	it('should have a qaHook on the root node if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} qaHook="cheese-and-crackers" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.getAttribute('data-automationid'), 'cheese-and-crackers');
	});


	// Unchecked
	it('should be unchecked by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.isFalse(node.checked);
	});


	// isChecked property
	it('should be selected if isChecked is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} isChecked={true} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.isTrue(node.checked);
	});


	// isDisabled property
	it('should be disabled if isDisabled is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} isDisabled={true} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.include(node.className, 'xui-is-disabled');
		assert.isTrue(node.firstChild.disabled);
	});


	// isChecked and isDisabled properties
	it('should be selected and disabled if isChecked and isDisabled are both true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} isChecked={true} isDisabled={true} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.isTrue(node.checked && node.disabled);
	});


	// isRequired property
	it('should be required for form submission if isRequired is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} isRequired={true} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.isTrue(node.required);
	});


	// name property
	it('should have the correct name if one is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} name="Patrick" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.strictEqual(node.getAttribute('name'), 'Patrick');
	});


	// onChange property
	it('should call the provided onChange function every time the control changes state', function () {
		let toggle = false;
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {toggle = !toggle}} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		TestUtils.Simulate.change(node);
		assert.isTrue(toggle);
		TestUtils.Simulate.change(node);
		assert.isFalse(toggle);
	});


	// type default
	it('should be of type radio by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.strictEqual(node.type, 'radio');
	});


	// type radio
	it('should be of type radio if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} type="radio" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.strictEqual(node.type, 'radio');
	});


	// type checkbox
	it('should be of type checkbox if defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} type="checkbox" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.strictEqual(node.type, 'checkbox');
	});


	// value property
	it('should have the correct value if one is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToggleOption onChange={() => {}} type="radio" value="64" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild.firstChild;
		assert.strictEqual(node.getAttribute('value'), '64');
	});

});

import React from 'react';
import { assert } from 'chai';
import XUIRadio from '../XUIRadio';
import radioMain from '@xero/xui-icon/icons/radio-main';
import radioCheck from '@xero/xui-icon/icons/radio-check';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import star from '@xero/xui-icon/icons/star';

const TestUtils = require('react-dom/test-utils');

const NOOP = () => {};

describe('XUIRadio', function() {

	// type radio
	it('should be of type radio', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP}/>
			</div>
		);

		const node = component.querySelector('input');
		assert.strictEqual(node.type, 'radio');
	});


	// children property (label text)
	it('should have label text if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP}>Howdy, folks!</XUIRadio>
			</div>
		);

		const node = component.firstChild.lastChild;
		assert.strictEqual(node.innerHTML, 'Howdy, folks!');
	});


	// className property (additional classes)
	it('should use additional classes on the root node if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} className="dogs-are-totes-patotes" />
			</div>
		);

		const node = component.firstChild;
		assert.include(node.className, 'dogs-are-totes-patotes');
	});


	// qaHook property
	it('should have a qaHook on the root node if provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} qaHook="cheese-and-crackers" />
			</div>
		);

		const node = component.firstChild;
		assert.strictEqual(node.getAttribute('data-automationid'), 'cheese-and-crackers');
	});


	// SVG element uses xui-icon class
	it('should use the xui-icon class on the SVG element', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} />
			</div>
		);

		const node = component.querySelector('svg');
		assert.isTrue(node.classList.contains('xui-icon'));
	});


	// SVG path elements include role presentation
	it('should define role as presentation on each path element', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('role'), 'presentation');
		assert.strictEqual(main.getAttribute('role'), 'presentation');
		assert.strictEqual(check.getAttribute('role'), 'presentation');
	});


	// Icon combinatorics 1/9 (main: undefined, check: undefined)
	it('should use the default iconMainPath and iconCheckPath if both are undefined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), radioCheck);
	});


	// Icon combinatorics 2/9 (main: undefined, check: null)
	it('should use the default iconMainPath and iconCheckPath if iconMainPath is undefined and iconCheckPath is null', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconCheckPath={null} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), radioCheck);
	});


	// Icon combinatorics 3/9 (main: undefined, check: checkbox-check)
	it('should use the default iconMainPath and a custom iconCheckPath if iconMainPath is undefined and iconCheckPath is defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconCheckPath={checkboxCheck} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), checkboxCheck);
	});


	// Icon combinatorics 4/9 (main: null, check: undefined)
	it('should use the default iconMainPath and iconCheckPath if iconMainPath is null and iconCheckPath is undefined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={null} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), radioCheck);
	});


	// Icon combinatorics 5/9 (main: null, check: null)
	it('should use the default iconMainPath and iconCheckPath if both are null', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={null} iconCheckPath={null} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), radioCheck);
	});


	// Icon combinatorics 6/9 (main: null, check: checkbox-check)
	it('should use the default iconMainPath and a custom iconCheckPath if iconMainPath is null and iconCheckPath is defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={null} iconCheckPath={checkboxCheck} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), radioMain);
		assert.strictEqual(main.getAttribute('d'), radioMain);
		assert.strictEqual(check.getAttribute('d'), checkboxCheck);
	});


	// Icon combinatorics 7/9 (main: star, check: undefined)
	it('should use a custom iconMainPath without a checkmark if iconMainPath is defined and iconCheckPath is undefined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={star} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		assert.strictEqual(focus.getAttribute('d'), star);
		assert.strictEqual(main.getAttribute('d'), star);
		assert.strictEqual(node.childNodes.length, 2); // No checkmark path element
	});


	// Icon combinatorics 8/9 (main: star, check: null)
	it('should use a custom iconMainPath without a checkmark if iconMainPath is defined and iconCheckPath is null', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={star} iconCheckPath={null} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		assert.strictEqual(focus.getAttribute('d'), star);
		assert.strictEqual(main.getAttribute('d'), star);
		assert.strictEqual(node.childNodes.length, 2); // No checkmark path element
	});


	// Icon combinatorics 9/9 (main: star, check: checkbox-check)
	it('should use a custom iconMainPath and a custom iconCheckPath if both are defined', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} iconMainPath={star} iconCheckPath={checkboxCheck} />
			</div>
		);

		const node = component.querySelector('svg');
		const focus = node.childNodes[0];
		const main = node.childNodes[1];
		const check = node.childNodes[2];
		assert.strictEqual(focus.getAttribute('d'), star);
		assert.strictEqual(main.getAttribute('d'), star);
		assert.strictEqual(check.getAttribute('d'), checkboxCheck);
	});


	// Unchecked
	it('should be unchecked by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} />
			</div>
		);

		const node = component.querySelector('input');
		assert.isFalse(node.checked);
	});


	// isChecked property
	it('should be selected if isChecked is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} isChecked={true} />
			</div>
		);

		const node = component.querySelector('input');
		assert.isTrue(node.checked);
	});


	// isDisabled property
	it('should be disabled if isDisabled is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} isDisabled={true} />
			</div>
		);

		const node = component.firstChild;
		assert.include(node.className, 'xui-is-disabled');
		assert.isTrue(node.firstChild.disabled);
	});


	// isChecked and isDisabled properties
	it('should be selected and disabled if isChecked and isDisabled are both true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} isChecked={true} isDisabled={true} />
			</div>
		);

		const node = component.querySelector('input');
		assert.isTrue(node.checked && node.disabled);
	});


	// isRequired property
	it('should be required for form submission if isRequired is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} isRequired={true} />
			</div>
		);

		const node = component.querySelector('input');
		assert.isTrue(node.required);
	});


	// isReversed property
	it('should use the xui-styledcheckboxradio-reverse class on the root node if isReversed is true', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} isReversed={true} />
			</div>
		);

		const node = component.firstChild;
		assert.include(node.className, 'xui-styledcheckboxradio-reverse');
	});

	// name property
	it('should have the correct name if one is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} name="Patrick" />
			</div>
		);

		const node = component.querySelector('input');
		assert.strictEqual(node.getAttribute('name'), 'Patrick');
	});


	// onChange property
	it('should call the provided onChange function every time the control changes state', function () {
		let toggle = false;
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={() => {toggle = !toggle}} />
			</div>
		);

		const node = component.querySelector('input');
		TestUtils.Simulate.change(node);
		assert.isTrue(toggle);
		TestUtils.Simulate.change(node);
		assert.isFalse(toggle);
	});


	// value property
	it('should have the correct value if one is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIRadio onChange={NOOP} value="64" />
			</div>
		);

		const node = component.querySelector('input');
		assert.strictEqual(node.getAttribute('value'), '64');
	});

});

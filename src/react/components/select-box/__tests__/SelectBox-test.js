import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import SelectBox from '../SelectBox';
import SelectBoxOption from '../SelectBoxOption';
import Constants from '../Constants';
import { then } from './helpers';

const TestUtils = require('react-dom/test-utils');

const REFS = Constants.REFS;

/*
 * force React's warnings about Invalid prop|Failed propType to throw an error so it can be
 * checked using assert.throws
 */
let warn = console.warn;
console.warn = function(warning) {
	if (/(Invalid prop|Failed propType)/.test(warning)) {
		throw new Error(warning);
	}
	warn.apply(console, [].slice.call(arguments));
};

describe('SelectBox', function () {
	const options = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona'];
	let select;
	let wasSelected = false;

	beforeEach(function () {
		select = TestUtils.renderIntoDocument(
			<SelectBox
				label='Test Select Box'
				value={options[0]}
				name='Test'
				buttonContent={options[0]}>
				{options.map((opt, idx) => {
					return (
						<SelectBoxOption
							id={opt}
							key={opt + idx}
							selected={opt === options[0]}
							onSelect={() => {wasSelected = true}}
							value={opt}
							showCheckboxes={true}
							truncatedText={true}
						>
							{opt}
						</SelectBoxOption>
					);
				})}
			</SelectBox>
		);
	});

	it('should have the appropriate checkbox styles', function () {
		const node = ReactDOM.findDOMNode(select);
		const checkboxes = node.getElementsByClassName('xui-pickitem');
		[].slice.call(checkboxes).forEach(checkbox => {
			assert.isNotNull(checkbox.querySelector('span.xui-text-truncated'));
		});
	});

	it('should place the defaultValue as the initial input value', function () {
		const node = ReactDOM.findDOMNode(select);
		// Have to remove the title of the SVG used to show the down arrow icon
		const buttonValue = node.querySelector('button').textContent.replace('Toggle List', '');
		assert.strictEqual(buttonValue, options[0]);
	});

	it('should open the dropdown on click of the button when it has children', function () {
		TestUtils.Simulate.click(ReactDOM.findDOMNode(select[REFS.TRIGGER]));
		assert.isTrue(select.isDropDownOpen());
	});

	it('should not open the dropdown on click of the button when it does not have children', function () {
		select = TestUtils.renderIntoDocument(
			<SelectBox
				value="Test"
				label="Does not have children"
				name="Test"
				buttonContent="test"
				isOpen={false}
			>
			</SelectBox>
		);

		TestUtils.Simulate.click(ReactDOM.findDOMNode(select[REFS.TRIGGER]));
		assert.isFalse(select.isDropDownOpen());
	});

	it('should call onSelect on click of option', function () {
		const option = document.querySelector('.xui-pickitem');

		TestUtils.Simulate.click(option);

		then(() => {
			assert.isTrue(wasSelected);
		});
	});

	it('should open the dropdown on arrowDown', function() {
		//focus the button
		const node = ReactDOM.findDOMNode(select);
		const button = node.querySelector('button');

		TestUtils.Simulate.click(button);
		then(() => {
			TestUtils.Simulate.keyDown(button, {key: 'down arrow', keyCode: 40, which: 40});
		});

		assert.isTrue(select.isDropDownOpen());
	});

	describe('qaHook/Automation IDs are added correctly', () => {
		const qaHook = 'testQaHook';
		const noop = () => {};
		const select = TestUtils.renderIntoDocument(
			<SelectBox
				label='QA Hook test'
				qaHook={qaHook}
				name="Test"
				type="search"
				onInputChange={noop}
				onInputBlur={noop}
				buttonContent="test"
			>
				<SelectBoxOption id="sample" key="sample" onSelect={noop} value="Sample value">A sample option</SelectBoxOption>
			</SelectBox>
		);

		then(() => {
			// requires delay due to xui-base-component adding autoID via DOM on componentDidMount/Update
			const node = ReactDOM.findDOMNode(select);
			const nodeAutoId = node.getAttribute('data-automationid');
			const buttonAutoId = node.querySelector('button').getAttribute('data-automationid');

			assert.strictEqual(nodeAutoId, qaHook);
			assert.strictEqual(buttonAutoId, `${qaHook}-${Constants.QA_HOOKS.BUTTON}` );
		})
	});
});

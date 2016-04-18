import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUILoader from '../XUILoader.js';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

describe('XUILoader', function () {
	it('should render with an aria label describing its purpose', function () {

		const testString = 'Something is loading, please wait';

		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).children[0];
		assert.strictEqual(node.getAttribute('aria-label'), testString, testString);
	});

	it('should add extra classes when defined', function () {

		const testClass = 'test-class';

		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader className={testClass} label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).children[0];
		assert.strictEqual(node.classList[1], testClass, testClass);
	});
});

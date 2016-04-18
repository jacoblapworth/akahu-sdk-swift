import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUILoader from '../XUILoader.js';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

describe('XUIAvatar', function () {
	it('should render with an aria label describing it\'s purpose', function () {

		const testString = 'Something is loading, please wait';

		const component = TestUtils.renderIntoDocument(
			<XUILoader label="Something is loading, please wait" />
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.getAttribute('aria-label'), testString, testString);
	});

	it('should add extra classes when defined', function () {

		const testClass = 'test-class';

		const component = TestUtils.renderIntoDocument(
			<XUILoader className={testClass} label="Something is loading, please wait" />
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.classList[1], testClass, testClass);
	});
});

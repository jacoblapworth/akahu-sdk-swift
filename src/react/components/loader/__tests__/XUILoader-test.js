/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUILoader from '../XUILoader.js';

const assert = chai.assert;
const TestUtils = require('react-dom/test-utils');

describe('XUILoader', function () {
	it('should render with an aria label describing its purpose', function () {
		const testString = 'Something is loading, please wait';
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.getAttribute('aria-label'), testString);
	});

	it('should add extra classes when defined', function () {
		const testClass = 'test-class';
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader className={testClass} label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.isTrue(node.classList.contains(testClass));
	});

	it('should add the layout class by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.isTrue(node.classList.contains('xui-loader-layout'));
	});

	it('should not add the layout class if `defaultLayout` is set to `false`', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader defaultLayout={false} label="Something is loading, please wait" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.isFalse(node.classList.contains('xui-loader-layout'));
	});

	it('should add appropriate size classes', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUILoader label="Something is loading, please wait" />
				<XUILoader size="small" label="Something is loading, please wait" />
				<XUILoader size="large" label="Something is loading, please wait" />
			</div>
		);

		const node1 = ReactDOM.findDOMNode(component).children[0];
		const node2 = ReactDOM.findDOMNode(component).children[1];
		const node3 = ReactDOM.findDOMNode(component).children[2];
		assert.isTrue(node1.classList.contains('xui-loader'));
		assert.isTrue(node2.classList.contains('xui-loader-small'));
		assert.isTrue(node3.classList.contains('xui-loader-large'));
	});
});

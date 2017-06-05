import React from 'react';
import ReactDOM from 'react-dom';
import { assert, expect } from 'chai';
import XUIToast from '../XUIToast';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import XUIToastMessage from '../XUIToastMessage';

const TestUtils = require('react-dom/test-utils');

describe('XUIToast', () => {

	it('should render without a sentiment modifier if no sentiment is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast/>
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.className).to.not.contain('xui-toast-negative');
		expect(domNode.className).to.not.contain('xui-toast-positive');
	});

	it('should render with the negative sentiment modifier when sentiment is set to negative', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast sentiment={'negative'}/>
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.className).to.contain('xui-toast-negative');
	});

	it('should render with the positive sentiment modifier when sentiment is set to positive', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast sentiment={'positive'}/>
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.className).to.contain('xui-toast-positive');
	});

	it('should render the provided XUIToastMessage element', function () {

		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast>
					<XUIToastMessage>💩 Pile of Poo</XUIToastMessage>
				</XUIToast>
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(domNode.getElementsByClassName('xui-toast--message')[0].innerHTML, "💩 Pile of Poo");
	});

	it('should render without a close button if no close click function is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast />
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.getElementsByClassName('xui-toast--close').length).to.equal(0);
	});

	it('should render with a close button if close click function is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast onCloseClick={function(){}} />
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.getElementsByClassName('xui-toast--close').length).to.equal(1);
	});

	it('should add the appropriate `role` attribute depending on the sentiment (`alert` for positive/negative; else `status`)', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast sentiment="positive" />
				<XUIToast sentiment="negative" />
				<XUIToast />
			</div>
		);

		const container = ReactDOM.findDOMNode(component);
		const node1 = container.children[0];
		const node2 = container.children[1];
		const node3 = container.children[2];

		expect(node1.getAttribute('role')).to.equal('alert');
		expect(node2.getAttribute('role')).to.equal('alert');
		expect(node3.getAttribute('role')).to.equal('status');
	});

	it('should allow a custom `role` to be set', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast role="alert" />
				<XUIToast role="status" sentiment="negative" />
			</div>
		);

		const container = ReactDOM.findDOMNode(component);
		const node1 = container.children[0];
		const node2 = container.children[1];

		expect(node1.getAttribute('role')).to.equal('alert');
		expect(node2.getAttribute('role')).to.equal('status');
	});

	it('should render toast actions as buttons and/or links with the appropriate classes', function () {
		function onClick() {
			console.log('Clicked');
		}

		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIToast>
					<XUIToastActions>
						<XUIToastAction href="https://google.com">Hello</XUIToastAction>
						<XUIToastAction onClick={onClick}>Goodbye</XUIToastAction>
					</XUIToastActions>
				</XUIToast>
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).firstChild;
		expect(domNode.getElementsByClassName('xui-toast--action').length).to.equal(2);
		expect(domNode.getElementsByTagName('A').length).to.equal(1);
		expect(domNode.getElementsByTagName('BUTTON').length).to.equal(1);
	});
});

import { expect, assert } from 'chai';
import React from 'react';
import sinon from 'sinon';
import XUIButton from '../XUIButton';

const { renderIntoDocument, Simulate } = require('react-dom/test-utils');
const noop = () => {};

describe('<XUIButton/>', () => {
	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<XUIButton onClick={noop}>test</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.tagName.toLowerCase(), 'button');
		assert.strictEqual(node.textContent, 'test');
	});

	it('should render as a link element when isLink flag is set', () => {
		const button = renderIntoDocument(
			<XUIButton href="https://google.com" isLink={true}>foo</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.tagName, 'A');
		assert.strictEqual(node.innerHTML, 'foo');
	});

	it('should set the `target` prop as the `target` attribute if rendering a link', () => {
		const button = renderIntoDocument(
			<XUIButton isLink={true} href="https://google.com" target="_blank" isExternalLink={true}>foo</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.getAttribute('target'), '_blank');
	});

	it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton isLink={true} href="https://google.com" isExternalLink={true}>foo</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.getAttribute('rel'), 'external noopener noreferrer');
	});

	it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton isLink={true} href="https://google.com" target="_blank" rel="help"
			isExternalLink={true}>Help</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.getAttribute('rel'), 'help external noopener noreferrer');
	});

	it('should be able to receive and handle an onClick callback', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<XUIButton onClick={onClick}>test</XUIButton>
		);

		// although this component can trigger the 'onClick' handler with either
		// 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
		Simulate.click(button.rootNode);
		assert.isTrue(onClick.calledOnce);
	});

	it('should render a loader if the `isLoading` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton onClick={noop} isLoading={true}>Hai</XUIButton>
		);

		const node = button.rootNode;
		assert.strictEqual(node.children.length, 1);
		assert.isTrue(node.firstChild.classList.contains('xui-button--loader'));
	});

	it('should not allow clicks if the `isLoading` prop is true', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<XUIButton isLoading={true} onClick={onClick}>test</XUIButton>
		);

		Simulate.click(button.rootNode);

		assert.isFalse(onClick.calledOnce);
	});

	it('should work even if the button is a link and no click handler has been defined', () => {
		const button = renderIntoDocument(
			<XUIButton href="https://google.com" isLink={true}>Action</XUIButton>
		);
		assert.doesNotThrow(() => {Simulate.click(button.rootNode)}, Error);
	});

	it('links with an onclick handler should be able to handle click events with the handler', () => {
		const onClick = sinon.spy();
		const button = renderIntoDocument(
			<XUIButton isLink={true} onClick={onClick}>test</XUIButton>
		);
		Simulate.click(button.rootNode);
		assert.isTrue(onClick.calledOnce);
	});

	it('has a role attribute for links which function like buttons', () => {
		const button = renderIntoDocument(<XUIButton isLink={true} href="https://www.xero.com/" onClick={() => console.log('click')} />);
		assert.strictEqual(button.rootNode.getAttribute('role'), 'button');
	});

	it('does not have a role attribute for links which are just styled like buttons', () => {
		const button = renderIntoDocument(<XUIButton isLink={true} href="https://www.xero.com/" />);
		assert.isNull(button.rootNode.getAttribute('role'));
	});

	/*
	I tried to get these to work, but setting focus in karma doesn't seem to work.  Fucking sucks.  However, I did test
	the focus() API on the test-ui page.

	@dev-johnsanders 1 Dec 2016
	 */
	it.skip('focus() should focus the DOM node', function () {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		button.focus();
		assert.isTrue(button.rootNode === document.activeElement);
	});

	it.skip('hasFocus() should accurately reflect whether or not the main button DOM node has focus', function () {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		assert.isFalse(button.hasFocus(), 'said has focus when it does not');
		button.focus();
		assert.isTrue(button.hasFocus(), 'said does not have focus when does');
	});
});

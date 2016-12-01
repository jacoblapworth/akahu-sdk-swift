/* global describe, beforeEach, it */
import React from 'react';
import { assert } from 'chai';
import CSSClasses from 'xui-css-classes';

import XUIButton from '../XUIButton';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;
const noop = () => {};

describe('<XUIButton/>', () => {
	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<XUIButton onClick={noop}>test</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.tagName, 'BUTTON');
		assert.strictEqual(node.innerText, 'test');
	});

	it('should render as a link element when the type is `link`', () => {
		const button = renderIntoDocument(
			<XUIButton href="https://google.com" type="link">foo</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.tagName, 'A');
		assert.strictEqual(node.innerText, 'foo');
	});

	it('should set the `target` prop as the `target` attribute if rendering a link', () => {
		const button = renderIntoDocument(
			<XUIButton type="link" href="https://google.com" target="_blank" isExternalLink={true}>foo</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.getAttribute('target'), '_blank');
	});

	it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton type="link" href="https://google.com" isExternalLink={true}>foo</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.getAttribute('rel'), 'external noopener noreferrer');
	});

	it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton type="link" href="https://google.com" target="_blank" rel="help"
				   isExternalLink={true}>Help</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.getAttribute('rel'), 'help external noopener noreferrer');
	});

	it('should be able to receive and handle an onClick callback', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<XUIButton onClick={onClick}>test</XUIButton>
		);

		// although this component can trigger the 'onClick' handler with either
		// 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
		Simulate.click(button.buttonNode);
		assert.isTrue(onClick.calledOnce);
	});

	it('should render a loader if the `isLoading` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton type="button" onClick={noop} isLoading>Hai</XUIButton>
		);

		const node = button.buttonNode;
		assert.strictEqual(node.children.length, 1);
		assert.isTrue(node.firstChild.classList.contains(CSSClasses.Button.LOADER));
	});

	it('should not allow clicks if the `isLoading` prop is true', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<XUIButton isLoading={true} onClick={onClick}>test</XUIButton>
		);

		Simulate.click(button.buttonNode);

		assert.isFalse(onClick.calledOnce);
	});

	it('should work even if the button is a link and no click handler has been defined', () => {
		const button = renderIntoDocument(
			<XUIButton href="https://google.com" type="link">Action</XUIButton>
		);
		assert.doesNotThrow(() => {Simulate.click(button.buttonNode)}, Error);
	});

	it('links with an onclick handler should be able to handle click events with the handler', () => {
		const onClick = sinon.spy();
		const button = renderIntoDocument(
			<XUIButton type="link" onClick={onClick}>test</XUIButton>
		);
		Simulate.click(button.buttonNode);
		assert.isTrue(onClick.calledOnce);
	});

	it('has a role attribute for links which are function like buttons', () => {
		const button = renderIntoDocument(<XUIButton type="link" href="https://www.xero.com/" onClick={() => console.log('click')} />);
		assert.strictEqual(button.buttonNode.getAttribute('role'), 'button');
	});

	it('does not have a role attribute for links which are just styled like buttons', () => {
		const button = renderIntoDocument(<XUIButton type="link" href="https://www.xero.com/" />);
		assert.isNull(button.buttonNode.getAttribute('role'));
	});

	/*
	I tried to get these to work, but setting focus in karma doesn't seem to work.  Fucking sucks.  However, I did test
	the focus() API on the test-ui page.

	@dev-johnsanders 1 Dec 2016
	 */
	it.skip('focus() should focus the DOM node', function () {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		button.focus();
		assert.isTrue(button.buttonNode === document.activeElement);
	});

	it.skip('hasFocus() should accurately reflect whether or not the main button DOM node has focus', function () {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		assert.isFalse(button.hasFocus(), 'said has focus when it does not');
		button.focus();
		assert.isTrue(button.hasFocus(), 'said does not have focus when does');
	});
});

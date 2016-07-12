import React from 'react';
import { findDOMNode } from 'react-dom';
import { assert } from 'chai';
import CSSClasses from 'xui-css-classes';

import XUIButton from '../XUIButton';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

const noop = () => {};

describe('<XUIButton/>', () => {
	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton onClick={noop}>test</XUIButton>
			</div>
		);

		const node = findDOMNode(button).firstChild;
		assert.strictEqual(node.tagName, 'BUTTON');
		assert.strictEqual(node.innerText, 'test');
	});

	it('should render as a link element when the type is `link`', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton href="https://google.com" type="link">foo</XUIButton>
			</div>
		);

		const node = findDOMNode(button.firstChild);
		assert.strictEqual(node.tagName, 'A');
		assert.strictEqual(node.innerText, 'foo');
	});

	it('should set the `target` prop as the `target` attribute if rendering a link', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton type="link" href="https://google.com" target="_blank" isExternalLink={true}>foo</XUIButton>
			</div>
		);

		const node = findDOMNode(button).firstChild;
		assert.strictEqual(node.getAttribute('target'), '_blank');
	});

	it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton type="link" href="https://google.com" isExternalLink={true}>foo</XUIButton>
			</div>
		);

		const node = findDOMNode(button).firstChild;
		assert.strictEqual(node.getAttribute('rel'), 'external noopener noreferrer');
	});

	it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton type="link" href="https://google.com" target="_blank" rel="help"
					   isExternalLink={true}>Help</XUIButton>
			</div>
		);

		const node = findDOMNode(button).firstChild;
		assert.strictEqual(node.getAttribute('rel'), 'help external noopener noreferrer');
	});

	it('should be able to receive and handle an onClick callback', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<div>
				<XUIButton onClick={onClick}>test</XUIButton>
			</div>
		);

		// although this component can trigger the 'onClick' handler with either
		// 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
		Simulate.click(findDOMNode(button).firstChild);
		assert.isTrue(onClick.calledOnce);
	});

	it('should render a loader if the `isLoading` prop is true', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton type="button" isLoading>Hai</XUIButton>
			</div>
		);

		const node = findDOMNode(button).firstChild;
		assert.strictEqual(node.children.length, 1);
		assert.isTrue(node.firstChild.classList.contains(CSSClasses.Button.LOADER));
	});

	it('should not allow clicks if the `isLoading` prop is true', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<div>
				<XUIButton isLoading={true} onClick={onClick}>test</XUIButton>
			</div>
		);

		Simulate.click(findDOMNode(button).firstChild);

		assert.isFalse(onClick.calledOnce);
	});

	it('should work even if the button is a link and no click handler has been defined', () => {
		const button = renderIntoDocument(
			<div>
				<XUIButton href="https://google.com" type="link">Action</XUIButton>
			</div>
		);
		assert.doesNotThrow(() => {Simulate.click(findDOMNode(button).firstChild)}, Error);
	});

	it('links with an onclick handler should be able to handle click events with the handler', () => {
		const onClick = sinon.spy();
		const button = renderIntoDocument(
			<div>
				<XUIButton type="link" onClick={onClick}>test</XUIButton>
			</div>
		);
		Simulate.click(findDOMNode(button).firstChild);
		assert.isTrue(onClick.calledOnce);
	});
});

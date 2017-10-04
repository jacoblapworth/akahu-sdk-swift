import { assert } from 'chai';
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

	it('renders icon buttons with the correct classes', () => {
		const iconButton = renderIntoDocument(<XUIButton variant="icon" onClick={() => {}} />);
		assert.isTrue(iconButton.rootNode.classList.contains('xui-button-icon'));

		const invertedIconButton = renderIntoDocument(<XUIButton variant="icon-inverted" onClick={() => {}} />);
		assert.isTrue(invertedIconButton.rootNode.classList.contains('xui-button-icon'));
		assert.isTrue(invertedIconButton.rootNode.classList.contains('xui-button-icon-inverted'));

		const largeIconButton = renderIntoDocument(<XUIButton variant="icon-large" onClick={() => {}} />);
		assert.isTrue(largeIconButton.rootNode.classList.contains('xui-button-icon'));
		assert.isTrue(largeIconButton.rootNode.classList.contains('xui-button-icon-large'));

		const invertedLargeIconButton = renderIntoDocument(<XUIButton variant="icon-inverted-large" onClick={() => {}} />);
		assert.isTrue(invertedLargeIconButton.rootNode.classList.contains('xui-button-icon'));
		assert.isTrue(invertedLargeIconButton.rootNode.classList.contains('xui-button-icon-large'));
		assert.isTrue(invertedLargeIconButton.rootNode.classList.contains('xui-button-icon-inverted'));
	});

	it('renders borderless buttons with the correct classes', () => {
		const primary = renderIntoDocument(<XUIButton variant="borderless-primary" onClick={() => {}} />);
		assert.isTrue(primary.rootNode.classList.contains('xui-button-borderless-main'));

		const create = renderIntoDocument(<XUIButton variant="borderless-create" onClick={() => {}} />);
		assert.isTrue(create.rootNode.classList.contains('xui-button-borderless-create'));

		const standard = renderIntoDocument(<XUIButton variant="borderless-standard" onClick={() => {}} />);
		assert.isTrue(standard.rootNode.classList.contains('xui-button-borderless-standard'));

		const negative = renderIntoDocument(<XUIButton variant="borderless-negative" onClick={() => {}} />);
		assert.isTrue(negative.rootNode.classList.contains('xui-button-borderless-negative'));

		const inverted = renderIntoDocument(<XUIButton variant="borderless-inverted" onClick={() => {}} />);
		assert.isTrue(inverted.rootNode.classList.contains('xui-button-borderless-inverted'));

		const muted = renderIntoDocument(<XUIButton variant="borderless-muted" onClick={() => {}} />);
		assert.isTrue(muted.rootNode.classList.contains('xui-button-borderless-muted'));
	});

	it('has a role attribute for links which function like buttons', () => {
		const button = renderIntoDocument(<XUIButton isLink href="https://www.xero.com/" onClick={() => {}} />);
		assert.strictEqual(button.rootNode.getAttribute('role'), 'button');
	});

	it('does not have a role attribute for links which are just styled like buttons', () => {
		const button = renderIntoDocument(<XUIButton isLink href="https://www.xero.com/" />);
		assert.isNull(button.rootNode.getAttribute('role'));
	});

	it('focus() should focus the DOM node', () => {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		button.focus();
		assert.isTrue(button.rootNode === document.activeElement);
	});

	it('hasFocus() should accurately reflect whether or not the main button DOM node has focus', () => {
		const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
		assert.isFalse(button.hasFocus(), 'said has focus when it does not');
		button.focus();
		assert.isTrue(button.hasFocus(), 'said does not have focus when does');
	});

	it('renders inverted buttons in different variations correctly', () => {
		const standardInvertedbutton = renderIntoDocument(<XUIButton isInverted variant="primary">test</XUIButton>);
		assert.isTrue(
			standardInvertedbutton.rootNode.classList.contains('xui-button-main'),
			'Primary button has primary class'
		);
		assert.isTrue(
			standardInvertedbutton.rootNode.classList.contains('xui-button-inverted'),
			'Primary button has inverted class'
		);
		assert.isFalse(
			standardInvertedbutton.rootNode.classList.contains('xui-button-borderless-main'),
			'Primary button does not have borderless main class'
		);

		const borderlessInvertedbutton = renderIntoDocument(<XUIButton isInverted variant="borderless-primary">test</XUIButton>);
		assert.isTrue(
			borderlessInvertedbutton.rootNode.classList.contains('xui-button-borderless-main'),
			'Borderless primary button has borderless primary class'
		);
		assert.isTrue(
			borderlessInvertedbutton.rootNode.classList.contains('xui-button-borderless-inverted'),
			'Borderless primary button has borderless inverted class'
		);
		assert.isFalse(
			borderlessInvertedbutton.rootNode.classList.contains('xui-button-inverted'),
			'Borderless primary button does not have regular inverted class'
		);

		const iconInvertedbutton = renderIntoDocument(<XUIButton variant="icon-inverted">test</XUIButton>);
		assert.isTrue(
			iconInvertedbutton.rootNode.classList.contains('xui-button-icon'),
			'Icon button has borderless primary class'
		);
		assert.isTrue(
			iconInvertedbutton.rootNode.classList.contains('xui-button-icon-inverted'),
			'Icon button has borderless inverted class'
		);
		assert.isFalse(
			iconInvertedbutton.rootNode.classList.contains('xui-button-borderless-inverted'),
			'Icon button does not have borderless inverted class'
		);
		assert.isFalse(
			iconInvertedbutton.rootNode.classList.contains('xui-button-inverted'),
			'Icon button does not have regular inverted class'
		);
	});
});

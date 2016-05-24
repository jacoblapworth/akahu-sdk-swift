import React from 'react';
import { findDOMNode } from 'react-dom';

import XUIButton from '../XUIButton';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

const noop = () => {};

describe('<XUIButton/>', () => {
	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<XUIButton onClick={noop}>test</XUIButton>
		);

		const node = findDOMNode(button);
		node.tagName.should.equal('BUTTON');
		node.innerText.should.equal('test');
	});

	it('should render as a link element when the type is `link`', () => {
		const button = renderIntoDocument(
			<XUIButton href="https://google.com" type="link">foo</XUIButton>
		);

		const node = findDOMNode(button);
		node.tagName.should.equal('A');
		node.innerText.should.equal('foo');
	});

	it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton type="link" href="https://google.com" target="_blank" isExternalLink={true}>foo</XUIButton>
		);

		const node = findDOMNode(button);
		node.getAttribute('target').should.equal('_blank');
		node.getAttribute('rel').should.equal('external noopener noreferrer');
	});

	it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
		const button = renderIntoDocument(
			<XUIButton type="link" href="https://google.com" target="_blank" rel="help" isExternalLink={true}>Help</XUIButton>
		);

		const node = findDOMNode(button);
		node.getAttribute('rel').should.equal('help external noopener noreferrer');
	});

	it('should be able to receive and handle an onClick callback', () => {
		const onClick = sinon.spy();

		const button = renderIntoDocument(
			<XUIButton onClick={onClick}>test</XUIButton>
		);

		// although this component can trigger the 'onClick' handler with either
		// 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
		Simulate.click(findDOMNode(button));

		onClick.should.have.been.calledOnce;
	});
});

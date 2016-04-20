import React from 'react';
import { findDOMNode } from 'react-dom';
import { assert, expect } from 'chai';

import XUIButton from '../XUIButton';

const { renderIntoDocument, Simulate } = React.addons.TestUtils;

const noop = () => {};

describe('<XUIButton/>', () => {
	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<XUIButton onClick={noop}>test</XUIButton>
		);

		const node = findDOMNode(button);
		assert.strictEqual(node.tagName, 'BUTTON', 'XUIButton has been rendered with a BUTTON tag');
		assert.strictEqual(node.innerText, 'test', 'XUIButton has been rendered with the right text');
	});

	it('should render as a button element when no type is provided', () => {
		const button = renderIntoDocument(
			<XUIButton type="link">foo</XUIButton>
		);

		const node = findDOMNode(button);
		assert.strictEqual(node.tagName, 'A', 'XUIButton has been rendered with a A tag');
	});

	it('should be able to receive and handle an onClick callback', () => {
		let clicks = 0;

		const button = renderIntoDocument(
			<XUIButton onClick={() => clicks++}>test</XUIButton>
		);

		Simulate.click(findDOMNode(button));

		expect(clicks).to.equal(1);
	});
});

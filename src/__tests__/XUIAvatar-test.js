import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import XUIAvatar from '../XUIAvatar.js';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

describe('XUIAvatar', function () {
	it('should render as an image element if the imageUrl prop is provided', function () {
		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";

		const component = TestUtils.renderIntoDocument(
			<XUIAvatar imageUrl={imageUrl} />
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.tagName, 'IMG', 'Avatar has been rendered with an IMG element');
		assert.strictEqual(node.src, imageUrl, 'IMG element src attribute is the same as the imageUrl prop');
	});

	it('should render as an abbreviation element if no imageUrl prop is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<XUIAvatar value="Donald Duck Trump" />
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, 'D', 'ABBR innerHTML contains the first character of the value');
	});

	it('should render values starting with a unicode astral symbol correctly', function () {
		const component = TestUtils.renderIntoDocument(
			<XUIAvatar value="💩 Pile of Poo"/>
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, '💩', 'ABBR innerHTML contains the first character of the value');
	});

	it('should give different color classes to avatars with the same values but different identifiers', function () {
		const component1 = TestUtils.renderIntoDocument(
			<XUIAvatar value="Donald Duck Trump" identifier="ABC" />
		);

		const component2 = TestUtils.renderIntoDocument(
			<XUIAvatar value="Donald Duck Trump" identifier="XYZ" />
		);

		const component3 = TestUtils.renderIntoDocument(
			<XUIAvatar value="Donald Duck Trump" identifier="123" />
		);

		const node1 = ReactDOM.findDOMNode(component1);
		const node2 = ReactDOM.findDOMNode(component2);
		const node3 = ReactDOM.findDOMNode(component3);

		assert.isTrue(node1.className !== node2.className);
		assert.isTrue(node2.className !== node3.className);
		assert.isTrue(node3.className !== node1.className);
	});

	it('should throw if neither a value nor an imageUrl is passed in', function () {
		assert.throws(function() {
			const component = TestUtils.renderIntoDocument(
				<XUIAvatar />
			);
		});
	});
});
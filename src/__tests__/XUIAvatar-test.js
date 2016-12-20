import chai from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';

import XUIAvatar from '../XUIAvatar';
import {classNames, sizeClassNames} from '../constants';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

// Note: the rendering of <divs> in the tests below is a crappy workaround for
// https://github.com/facebook/react/issues/4839
describe('XUIAvatar', function () {
	it('should render as an image element if the imageUrl prop is provided', function () {
		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";

		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="123" imageUrl={imageUrl} />
			</div>
		);

		const node = dom.firstElementChild;
		assert.strictEqual(node.tagName, 'IMG', 'Avatar has been rendered with an IMG element');
		assert.strictEqual(node.src, imageUrl, 'IMG element src attribute is the same as the imageUrl prop');
	});

	it('should render with the correct class given the size prop', function () {
		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="123" />
				<XUIAvatar size="small" value="123" />
				<XUIAvatar size="large" value="123" />
				<XUIAvatar size="xlarge" value="123" />
			</div>
		);

		const node1 = dom.children[0];
		const node2 = dom.children[1];
		const node3 = dom.children[2];
		const node4 = dom.children[3];
		assert.isTrue(node1.classList.contains(classNames.base), 'Avatar has the base class');
		assert.isTrue(node2.classList.contains(classNames.base), 'Avatar with size="small" has the base class');
		assert.isTrue(node2.classList.contains(sizeClassNames.small), 'Avatar with size="small" has the small class');
		assert.isTrue(node3.classList.contains(classNames.base), 'Avatar with size="large" has the base class');
		assert.isTrue(node3.classList.contains(sizeClassNames.large), 'Avatar with size="large" has the large class');
		assert.isTrue(node4.classList.contains(classNames.base), 'Avatar with size="xlarge" has the base class');
		assert.isTrue(node4.classList.contains(sizeClassNames.xlarge), 'Avatar with size="xlarge" has the xlarge class');
	});

	it('should render as an abbreviation element if no imageUrl prop is provided', function () {
		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" />
			</div>
		);

		const node = dom.firstElementChild;
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, 'D', 'ABBR innerHTML contains the first character of the value');
	});

	it('should render as an abbreviation element with the first non-whitespace character if no imageUrl prop is provided', function () {
		const value = " \t\nDonald Duck Trump";
		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value={value} />
			</div>
		);

		const node = dom.firstElementChild;
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, 'D', 'ABBR innerHTML contains the first character of the value');
	});

	it('should render values starting with a unicode astral symbol correctly', function () {
		const dom = TestUtils.renderIntoDocument(
			<div id="test5">
				<XUIAvatar value="💩 Pile of Poo"/>
			</div>
		);

		const node = dom.firstElementChild;
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, '💩', 'ABBR innerHTML contains the first character of the value');
	});

	it('should give different color classes to avatars with the same values but different identifiers', function () {
		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" identifier="ABC" />
				<XUIAvatar value="Donald Duck Trump" identifier="XYZ" />
				<XUIAvatar value="Donald Duck Trump" identifier="123" />
			</div>
		);

		const node1 = dom.children[0];
		const node2 = dom.children[1];
		const node3 = dom.children[2];

		assert.isTrue(node1.className !== node2.className);
		assert.isTrue(node2.className !== node3.className);
		assert.isTrue(node3.className !== node1.className);
	});

	it('should render an avatar with an image that does not exist as an abbreviation', function(done) {
		const imageUrl = "https://example.com/non-existent-image.png";

		function onErrorHandler() {
			// Give React a chance to render async
			setTimeout(function() {
				assert.strictEqual(dom.firstElementChild.tagName, 'ABBR', 'Avatar has been re-rendered with an ABBR element');
				done();
			}, 10);
		}

		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar imageUrl={imageUrl} onError={onErrorHandler} value="Something something" />
			</div>

		);

		const node = dom.firstElementChild;
		assert.strictEqual(node.tagName, 'IMG', 'Avatar has been rendered with an IMG element initially');
	});

	it('should render business avatars with uppercased acronyms of up to 3 characters based on the first letter of each word in the value, excluding brackets', function () {

		const dom = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar variant="business" value="Rod Drury Paddleboards Inc" />
				<XUIAvatar variant="business" value="Keynesian Stimulants" />
				<XUIAvatar variant="business" value="hipsterlowercaseonewordcompany" />
				<XUIAvatar variant="business" value="  [This] (Long) {Company} Name" />
			</div>
		);

		const node1 = dom.children[0];
		const node2 = dom.children[1];
		const node3 = dom.children[2];
		const node4 = dom.children[3];
		assert.strictEqual(node1.textContent, 'RDP', 'Avatar whose value consists of 4 words should render the first letters from the first 3 words');
		assert.strictEqual(node2.textContent, 'KS', 'Avatar whose value consists of 2 words should render the first letters from each of the 2 words');
		assert.strictEqual(node3.textContent, 'H', 'Avatar whose value consists of 1 lowercase word should render the first letter uppercased');
		assert.strictEqual(node4.textContent, 'TLC', 'Avatar containing leading spaces, words surrounded in braces of various kinds, should abbreviate to non-spaces, non-brace characters');
	});

});

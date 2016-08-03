import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import CSSClasses from 'xui-css-classes';

import XUIAvatar from '../XUIAvatar';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

// Note: the rendering of <divs> in the tests below is a crappy workaround for
// https://github.com/facebook/react/issues/4839
describe('XUIAvatar', function () {
	it('should render as an image element if the imageUrl prop is provided', function () {
		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";

		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="123" imageUrl={imageUrl} />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.tagName, 'IMG', 'Avatar has been rendered with an IMG element');
		assert.strictEqual(node.src, imageUrl, 'IMG element src attribute is the same as the imageUrl prop');
	});

	it('should render with the correct class given the size prop', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="123" />
				<XUIAvatar size="small" value="123" />
				<XUIAvatar size="large" value="123" />
				<XUIAvatar size="xlarge" value="123" />
			</div>
		);

		const node1 = ReactDOM.findDOMNode(component).children[0];
		const node2 = ReactDOM.findDOMNode(component).children[1];
		const node3 = ReactDOM.findDOMNode(component).children[2];
		const node4 = ReactDOM.findDOMNode(component).children[3];
		assert.isTrue(node1.classList.contains(CSSClasses.Avatar.BASE), 'Avatar has the base class');
		assert.isTrue(node2.classList.contains(CSSClasses.Avatar.BASE), 'Avatar with size="small" has the base class');
		assert.isTrue(node2.classList.contains(CSSClasses.Avatar.SMALL), 'Avatar with size="small" has the small class');
		assert.isTrue(node3.classList.contains(CSSClasses.Avatar.BASE), 'Avatar with size="large" has the base class');
		assert.isTrue(node3.classList.contains(CSSClasses.Avatar.LARGE), 'Avatar with size="large" has the large class');
		assert.isTrue(node4.classList.contains(CSSClasses.Avatar.BASE), 'Avatar with size="xlarge" has the base class');
		assert.isTrue(node4.classList.contains(CSSClasses.Avatar.XLARGE), 'Avatar with size="xlarge" has the xlarge class');
	});

	it('should render as an abbreviation element if no imageUrl prop is provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" />
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, 'D', 'ABBR innerHTML contains the first character of the value');
	});

	it('should render values starting with a unicode astral symbol correctly', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="💩 Pile of Poo"/>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been rendered with an ABBR element');
		assert.strictEqual(node.innerHTML, '💩', 'ABBR innerHTML contains the first character of the value');
	});

	it('should give different color classes to avatars with the same values but different identifiers', function () {
		const component1 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" identifier="ABC" />
			</div>
		);

		const component2 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" identifier="XYZ" />
			</div>
		);

		const component3 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatar value="Donald Duck Trump" identifier="123" />
			</div>
		);

		const node1 = ReactDOM.findDOMNode(component1).children[0];
		const node2 = ReactDOM.findDOMNode(component2).children[0];
		const node3 = ReactDOM.findDOMNode(component3).children[0];

		assert.isTrue(node1.className !== node2.className);
		assert.isTrue(node2.className !== node3.className);
		assert.isTrue(node3.className !== node1.className);
	});

	it('should render an avatar with an image that does not exist as an abbreviation', function(done) {
		const imageUrl = "https://example.com/non-existent-image.png";

		function onErrorHandler() {
			// Give React a chance to render async
			setTimeout(function() {
				const node = ReactDOM.findDOMNode(component);
				assert.strictEqual(node.tagName, 'ABBR', 'Avatar has been re-rendered with an ABBR element');
				done();
			}, 10);
		}

		const component = TestUtils.renderIntoDocument(
			<XUIAvatar imageUrl={imageUrl} onError={onErrorHandler} value="Something something" />
		);

		const node = ReactDOM.findDOMNode(component);
		assert.strictEqual(node.tagName, 'IMG', 'Avatar has been rendered with an IMG element initially');
	});

});

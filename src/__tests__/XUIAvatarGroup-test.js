import React from 'react';
import ReactDOM from 'react-dom';
import chai from 'chai';
import CSSClasses from 'xui-css-classes';

import XUIAvatar from '../XUIAvatar';
import XUISimpleAvatar from '../XUISimpleAvatar';
import XUIAvatarGroup from '../XUIAvatarGroup';
import XUIAvatarCounter from '../XUIAvatarCounter';

const assert = chai.assert;
const TestUtils = React.addons.TestUtils;

// Note: the rendering of <divs> in the tests below is a crappy workaround for
// https://github.com/facebook/react/issues/4839
describe('XUIAvatarGroup', function () {
	it('should have the correct class', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup>
					<XUIAvatar size="small" value="HAI" />
				</XUIAvatarGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.isTrue(node.classList.contains(CSSClasses.Avatar.GROUP), "Avatar group has the correct class name");
	});

	it('should render child avatars', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup>
					<XUIAvatar size="small" value="HAI" />
				</XUIAvatarGroup>
			</div>
		);

		const node = ReactDOM.findDOMNode(component).firstChild;
		assert.strictEqual(node.children.length, 1, "Avatar group div has a child node");
		assert.strictEqual(node.children[0].tagName, 'ABBR', "Avatar has the correct tag name");
	});

	it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup avatarSize="small">
					<XUIAvatar value="HAI" />
					<XUISimpleAvatar value="HAI" />
					<XUIAvatarCounter count={3} />
				</XUIAvatarGroup>
			</div>
		);

		const compNode = ReactDOM.findDOMNode(component).firstChild;
		const node1 = compNode.children[0];
		const node2 = compNode.children[1];
		const node3 = compNode.children[2];
		assert.isTrue(node1.classList.contains(CSSClasses.Avatar.SMALL), "Child avatar component has the correct class name");
		assert.isTrue(node2.classList.contains(CSSClasses.Avatar.SMALL), "Child simple avatar component has the correct class name");
		assert.isTrue(node3.classList.contains(CSSClasses.Avatar.SMALL), "Child avatar counter component has the correct class name");
	});

	it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component, regardless if the child components have set their own size', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup avatarSize="small">
					<XUIAvatar size="large" value="HAI" />
					<XUISimpleAvatar size="large" value="HAI" />
					<XUIAvatarCounter size="large" count={2} />
				</XUIAvatarGroup>
			</div>
		);

		const compNode = ReactDOM.findDOMNode(component).firstChild;
		const node1 = compNode.children[0];
		const node2 = compNode.children[1];
		const node3 = compNode.children[2];
		assert.isTrue(node1.classList.contains(CSSClasses.Avatar.SMALL), "Child avatar component has the correct class name");
		assert.isTrue(node2.classList.contains(CSSClasses.Avatar.SMALL), "Child simple avatar component has the correct class name");
		assert.isTrue(node3.classList.contains(CSSClasses.Avatar.SMALL), "Child avatar counter component has the correct class name");
	});

	it('should render a counter if the maxAvatars property is provided', function () {
		const component1 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup maxAvatars={1}>
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
				</XUIAvatarGroup>
			</div>
		);

		const component2 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup maxAvatars={2}>
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
				</XUIAvatarGroup>
			</div>
		);

		const component3 = TestUtils.renderIntoDocument(
			<div>
				<XUIAvatarGroup maxAvatars={3}>
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
					<XUIAvatar value="HAI" />
				</XUIAvatarGroup>
			</div>
		);

		const comp1Node = ReactDOM.findDOMNode(component1).firstChild;
		const comp2Node = ReactDOM.findDOMNode(component2).firstChild;
		const comp3Node = ReactDOM.findDOMNode(component3).firstChild;

		assert.strictEqual(comp1Node.children.length, 1, 'When maxAvatars = 1 and there are 3 avatars, there should be only one rendered child');
		assert.isTrue(comp1Node.children[0].classList.contains(CSSClasses.Avatar.COUNTER), 'When maxAvatars = 1 and there are 3 children, the rendered child should be a counter');
		assert.strictEqual(comp1Node.children[0].textContent, '+3', 'When maxAvatars = 1 and there are 3 children, the counter should say "+3"');

		assert.strictEqual(comp2Node.children.length, 2, 'When maxAvatars = 2 and there are 3 avatars, there should be two rendered children');
		assert.isTrue(comp2Node.children[1].classList.contains(CSSClasses.Avatar.COUNTER), 'When maxAvatars = 2 and there are 3 children, the second rendered child should be a counter');
		assert.strictEqual(comp2Node.children[1].textContent, '+2', 'When maxAvatars = 2 and there are 3 children, the counter should say "+2"');

		assert.strictEqual(comp3Node.children.length, 3, 'When maxAvatars = 3 and there are 3 avatars, there should be three rendered children');
		assert.isFalse(comp3Node.children[2].classList.contains(CSSClasses.Avatar.COUNTER), 'When maxAvatars = 3 and there are 3 children, the last child should not be a counter');
	});
});

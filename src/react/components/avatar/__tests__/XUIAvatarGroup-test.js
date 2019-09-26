import { assert } from 'chai';
import React from 'react';

import XUIAvatar from '../XUIAvatar';
import XUIAvatarGroup from '../XUIAvatarGroup';
import XUIAvatarCounter from '../XUIAvatarCounter';
import { classNames, sizeClassNames } from '../constants';
import renderer from 'react-test-renderer';

const TestUtils = require('react-dom/test-utils');

// Note: the rendering of <divs> in the tests below is a crappy workaround for
// https://github.com/facebook/react/issues/4839
describe('XUIAvatarGroup', function() {
  it('should have the correct class', function() {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup>
          <XUIAvatar size="small" value="HAI" />
        </XUIAvatarGroup>
      </div>,
    );

    const node = dom.firstElementChild;
    assert.isTrue(
      node.classList.contains(classNames.group),
      'Avatar group has the correct class name',
    );
  });

  it('should render child avatars', function() {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup>
          <XUIAvatar size="small" value="HAI" />
        </XUIAvatarGroup>
      </div>,
    );

    const node = dom.firstElementChild;
    assert.strictEqual(node.children.length, 1, 'Avatar group div has a child node');
    assert.strictEqual(node.children[0].tagName, 'ABBR', 'Avatar has the correct tag name');
  });

  it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component', function() {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup avatarSize="small">
          <XUIAvatar value="HAI" />
          <XUIAvatarCounter count={3} />
        </XUIAvatarGroup>
      </div>,
    );

    const compNode = dom.firstElementChild;
    const node1 = compNode.children[0];
    const node2 = compNode.children[1];
    assert.isTrue(
      node1.classList.contains(sizeClassNames.small),
      'Child avatar component has the correct class name',
    );
    assert.isTrue(
      node2.classList.contains(sizeClassNames.small),
      'Child avatar counter component has the correct class name',
    );
  });

  it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component, regardless if the child components have set their own size', function() {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup avatarSize="small">
          <XUIAvatar size="large" value="HAI" />
          <XUIAvatarCounter size="large" count={2} />
        </XUIAvatarGroup>
      </div>,
    );

    const parent = dom.firstElementChild;
    const node1 = parent.children[0];
    const node2 = parent.children[1];
    assert.isTrue(
      node1.classList.contains(sizeClassNames.small),
      'Child avatar component has the correct class name',
    );
    assert.isTrue(
      node2.classList.contains(sizeClassNames.small),
      'Child avatar counter component has the correct class name',
    );
  });

  it('should render a counter if the maxAvatars property is provided', function() {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup maxAvatars={1}>
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
        </XUIAvatarGroup>
        <XUIAvatarGroup maxAvatars={2}>
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
        </XUIAvatarGroup>
        <XUIAvatarGroup maxAvatars={3}>
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
        </XUIAvatarGroup>
      </div>,
    );

    const comp1Node = dom.children[0];
    const comp2Node = dom.children[1];
    const comp3Node = dom.children[2];

    assert.strictEqual(
      comp1Node.children.length,
      1,
      'When maxAvatars = 1 and there are 3 avatars, there should be only one rendered child',
    );
    assert.isTrue(
      comp1Node.children[0].classList.contains(classNames.counter),
      'When maxAvatars = 1 and there are 3 children, the rendered child should be a counter',
    );
    assert.strictEqual(
      comp1Node.children[0].textContent,
      '+3',
      'When maxAvatars = 1 and there are 3 children, the counter should say "+3"',
    );

    assert.strictEqual(
      comp2Node.children.length,
      2,
      'When maxAvatars = 2 and there are 3 avatars, there should be two rendered children',
    );
    assert.isTrue(
      comp2Node.children[1].classList.contains(classNames.counter),
      'When maxAvatars = 2 and there are 3 children, the second rendered child should be a counter',
    );
    assert.strictEqual(
      comp2Node.children[1].textContent,
      '+2',
      'When maxAvatars = 2 and there are 3 children, the counter should say "+2"',
    );

    assert.strictEqual(
      comp3Node.children.length,
      3,
      'When maxAvatars = 3 and there are 3 avatars, there should be three rendered children',
    );
    assert.isFalse(
      comp3Node.children[2].classList.contains(classNames.counter),
      'When maxAvatars = 3 and there are 3 children, the last child should not be a counter',
    );
  });

  it('should not render any avatars when maxAvatars=0', () => {
    const dom = TestUtils.renderIntoDocument(
      <div>
        <XUIAvatarGroup maxAvatars={0}>
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
          <XUIAvatar value="HAI" />
        </XUIAvatarGroup>
      </div>,
    );

    expect(dom.children.length).toBe(0);
  });

  it('should throw when maxAvatars attribute supplied, but not a number', () => {
    expect(() => renderer.create(<XUIAvatarGroup maxAvatars={[]} />)).toThrow();
  });

  it('should throw when maxAvatars attribute supplied, but is a number below 0', () => {
    expect(() => renderer.create(<XUIAvatarGroup maxAvatars={-1} />)).toThrow();
  });
});

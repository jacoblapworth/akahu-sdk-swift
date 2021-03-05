import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { axe, toHaveNoViolations } from 'jest-axe';
import XUIAvatar from '../XUIAvatar';
import XUIAvatarGroup from '../XUIAvatarGroup';
import XUIAvatarCounter from '../XUIAvatarCounter';
import { classNames, sizeClassNames } from '../constants';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('XUIAvatarGroup', function () {
  it('should have the correct class', () => {
    const wrapper = mount(
      <XUIAvatarGroup>
        <XUIAvatar size="small" value="HAI" />
      </XUIAvatarGroup>,
    );

    const node = wrapper.getDOMNode()[0];

    expect(node.classList).toContain(classNames.group);
  });

  it('should render child avatars', function () {
    const wrapper = mount(
      <XUIAvatarGroup>
        <XUIAvatar size="small" value="HAI" />
      </XUIAvatarGroup>,
    );

    const node = wrapper.getDOMNode()[0];

    expect(node.children.length).toEqual(1);
    expect(node.children[0].tagName).toEqual('ABBR');
  });

  it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component', () => {
    const wrapper = mount(
      <XUIAvatarGroup avatarSize="small">
        <XUIAvatar value="HAI" />
        <XUIAvatarCounter count={3} />
      </XUIAvatarGroup>,
    );

    const compNode = wrapper.getDOMNode()[0];
    const node1 = compNode.children[0];
    const node2 = compNode.children[1];

    expect(node1.classList).toContain(sizeClassNames.small);
    expect(node2.classList).toContain(sizeClassNames.small);
  });

  it('should render all child avatar components with the same size if the avatarSize prop is provided on the group component, regardless if the child components have set their own size', () => {
    const wrapper = mount(
      <XUIAvatarGroup avatarSize="small">
        <XUIAvatar size="large" value="HAI" />
        <XUIAvatarCounter size="large" count={2} />
      </XUIAvatarGroup>,
    );

    const parent = wrapper.getDOMNode()[0];
    const node1 = parent.children[0];
    const node2 = parent.children[1];

    expect(node1.classList).toContain(sizeClassNames.small);
    expect(node2.classList).toContain(sizeClassNames.small);
  });

  it('should render a counter if the maxAvatars property is provided', function () {
    const wrapper = mount(
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

    const comp1Node = wrapper.getDOMNode().children[0];
    const comp2Node = wrapper.getDOMNode().children[1];
    const comp3Node = wrapper.getDOMNode().children[2];

    expect(comp1Node.children.length).toEqual(1);
    expect(comp1Node.children[0].classList).toContain(classNames.counter);
    expect(comp1Node.children[0].textContent).toEqual('+3');

    expect(comp2Node.children.length).toEqual(2);
    expect(comp2Node.children[1].classList).toContain(classNames.counter);
    expect(comp2Node.children[1].textContent).toEqual('+2');

    expect(comp3Node.children.length).toEqual(3);
    expect(comp3Node.children[2].classList).not.toContain(classNames.counter);
  });

  it('should not render any avatars when maxAvatars=0', () => {
    const wrapper = render(
      <XUIAvatarGroup maxAvatars={0}>
        <XUIAvatar value="HAI" />
        <XUIAvatar value="HAI" />
        <XUIAvatar value="HAI" />
      </XUIAvatarGroup>,
    );

    expect(wrapper.children().length).toBe(0);
  });

  it('should throw when maxAvatars attribute supplied, but not a number', () => {
    expect(() => render(<XUIAvatarGroup maxAvatars={[]} />)).toThrow();
  });

  it('should throw when maxAvatars attribute supplied, but is a number below 0', () => {
    expect(() => render(<XUIAvatarGroup maxAvatars={-1} />)).toThrow();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIAvatarGroup>
        <XUIAvatar size="small" value="HAI" />
      </XUIAvatarGroup>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

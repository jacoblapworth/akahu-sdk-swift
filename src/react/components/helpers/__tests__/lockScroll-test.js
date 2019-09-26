import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { isScrollLocked, lockScroll, unlockScroll } from '../lockScroll';

Enzyme.configure({ adapter: new Adapter() });

describe('lock scroll', () => {
  it('should start unlocked', () => {
    const wrapper = mount(<div>Hello</div>);
    expect(isScrollLocked()).toBe(false);
  });

  it('should unlock scrolling after locking it', () => {
    const wrapper = mount(<div>Hello</div>);

    lockScroll();
    expect(isScrollLocked()).toBe(true);

    unlockScroll();
    expect(isScrollLocked()).toBe(false);
  });

  it('should follow unlocking rules based on lock depth', () => {
    const wrapper = mount(<div>Hello</div>);

    lockScroll();
    expect(isScrollLocked()).toBe(true);

    lockScroll();
    expect(isScrollLocked()).toBe(true);

    // Locked twice, single unlock should still be locked
    unlockScroll();
    expect(isScrollLocked()).toBe(true);

    // Final unlock, should unlock the view
    unlockScroll();
    expect(isScrollLocked()).toBe(false);
  });
});

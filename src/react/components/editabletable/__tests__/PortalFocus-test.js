import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PortalFocus from '../private/PortalFocus';
import { tableName } from '../private/constants';
import NOOP from '../../helpers/noop';

Enzyme.configure({ adapter: new Adapter() });

const mockRect = (x, y, width, height) => ({
  x: x,
  y: y,
  width: width,
  height: height,
  left: x,
  top: y,
  bottom: y + height,
  right: x + width,
});
const mockRef = (x, y, width, height) => {
  const refObject = { current: document.createElement('div') };
  refObject.current.addEventListener = NOOP;
  refObject.current.removeEventListener = NOOP;
  refObject.current.getBoundingClientRect = () => mockRect(x, y, width, height);
  return refObject;
};

const baseName = `.${tableName}--portalfocus`;

describe('Portal focus', () => {
  it('renders with the entire focus ring', () => {
    const scrollContainerRef = mockRef(10, 10, 200, 100);
    const cellRef = mockRef(20, 20, 20, 5);

    const wrapper = mount(
      <PortalFocus cellRef={cellRef} isFocused scrollContainerRef={scrollContainerRef} />,
    );

    expect(wrapper.find(baseName).length).toBe(1);
  });

  it('renders with the right side covered', () => {
    const scrollContainerRef = mockRef(10, 10, 200, 100);
    const cellRef = mockRef(190, 20, 20, 5);

    const wrapper = mount(
      <PortalFocus cellRef={cellRef} isFocused scrollContainerRef={scrollContainerRef} />,
    );

    expect(wrapper.find(`${baseName}-rightCovered`).length).toBe(1);
  });

  it('renders with the left side covered', () => {
    const scrollContainerRef = mockRef(10, 10, 200, 100);
    const cellRef = mockRef(5, 20, 20, 5);

    const wrapper = mount(
      <PortalFocus cellRef={cellRef} isFocused scrollContainerRef={scrollContainerRef} />,
    );

    expect(wrapper.find(`${baseName}-leftCovered`).length).toBe(1);
  });

  it('renders with the horizontal side covered', () => {
    const scrollContainerRef = mockRef(10, 10, 10, 100);
    const cellRef = mockRef(5, 20, 20, 5);

    const wrapper = mount(
      <PortalFocus cellRef={cellRef} isFocused scrollContainerRef={scrollContainerRef} />,
    );

    expect(wrapper.find(`${baseName}-horizontalCovered`).length).toBe(1);
  });

  it('will not render when not in view', () => {
    const scrollContainerRef = mockRef(10, 10, 100, 100);
    const cellRef = mockRef(130, 20, 20, 5);

    const wrapper = mount(
      <PortalFocus cellRef={cellRef} isFocused scrollContainerRef={scrollContainerRef} />,
    );

    expect(wrapper.find(baseName).length).toBe(0);
  });
});

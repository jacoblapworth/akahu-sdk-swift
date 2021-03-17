import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { Breakpoints } from './breakpoints';

export type Component = {
  _area: React.RefObject<HTMLElement>;
  _breakpoints?: Breakpoints;
  _onResize: (contentRect: DOMRectReadOnly) => void;
} & React.Component;

type SetBreakpoints = (component: Component, width: number) => void;

const entryComponentMap = new WeakMap<Element, Component>();
const entryBreakpointMap = new WeakMap<Element, SetBreakpoints>();

const handleEntries = (entries: ResizeObserverEntry[]) => {
  entries.forEach(entry => {
    // Match the DOM node with its component.
    const component = entryComponentMap.get(entry.target);
    const setBreakpoints = entryBreakpointMap.get(entry.target);

    if (!component) {
      // It may be possible for an application to delete the relevant components/elements
      // without un-mounting and un-observing them. This is an edge case we can't reproduce,
      // but we can guard against. [XUI-1074]
      return;
    }

    if (typeof setBreakpoints === 'function') {
      setBreakpoints(component, entry.contentRect.width);
    }

    if (typeof component._onResize === 'function') {
      // Specifying DOMRectReadOnly to avoid using the ResizeOberver polyfill's DOMRect
      component._onResize(entry.contentRect as DOMRectReadOnly);
    }
  });
};

// Create a single ResizeObserver instance to handle all
// container elements. The instance is created with a callback,
// which is invoked as soon as an element is observed as well
// as any time that element's size changes.
const ro = new ResizeObserver(handleEntries);

export const observe = (component: Component, setBreakpoints?: SetBreakpoints) => {
  const element = component?._area?.current;
  if (!element) {
    return;
  }
  entryComponentMap.set(element, component);
  if (setBreakpoints !== undefined) {
    entryBreakpointMap.set(element, setBreakpoints);
  }
  ro?.observe(element);
};

export const unobserve = (component: Component) => {
  const element = component?._area?.current;
  if (!element) {
    return;
  }
  entryComponentMap.delete(element);
  ro?.unobserve(element);
};

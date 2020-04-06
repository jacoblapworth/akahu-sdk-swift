import ResizeObserver from 'resize-observer-polyfill';
import defaultBreakpoints, { widthClasses } from './breakpoints';

const entryComponentMap = new WeakMap();

const handleEntries = entries => {
  entries.forEach(entry => {
    // Match the DOM node with its component.
    const entryComponent = entryComponentMap.get(entry.target);
    if (!entryComponent) {
      // It may be possible for an application to delete the relevant components/elements
      // without un-mounting and un-observing them. This is an edge case we can't reproduce,
      // but we can guard against. [XUI-1074]
      return;
    }
    // If breakpoints are defined on the observed element's component,
    // use them. Otherwise use the defaults.
    const customBreakpoints =
      entryComponent._breakpoints !== undefined && entryComponent._breakpoints;
    const breakpoints = customBreakpoints || defaultBreakpoints;

    // Update the matching breakpoints on the observed element.
    const newState = {};
    Object.keys(breakpoints).forEach(breakpoint => {
      const minWidth = breakpoints[breakpoint];
      newState[breakpoint] = entry.contentRect.width >= minWidth;
    });
    if (entryComponent._onResize && typeof entryComponent._onResize === 'function') {
      entryComponent._onResize(entry.contentRect.width);
    }
    entryComponent.setState(newState);
  });
};

// Create a single ResizeObserver instance to handle all
// container elements. The instance is created with a callback,
// which is invoked as soon as an element is observed as well
// as any time that element's size changes.
const ro = new ResizeObserver(handleEntries);

export const observe = component => {
  const element = component && component._area && component._area.current;
  if (!element) {
    return;
  }
  entryComponentMap.set(element, component);
  ro && ro.observe(element);
};

export const unobserve = component => {
  const element = component && component._area && component._area.current;
  if (!element) {
    return;
  }
  entryComponentMap.delete(element, component);
  ro && ro.unobserve(element);
};

export const getWidthClasses = stateObj => {
  if (!stateObj) return [];
  return Object.keys(widthClasses).map(width => stateObj[width] && widthClasses[width]);
};

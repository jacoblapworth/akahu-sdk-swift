import defaultBreakpoints, { getWidthClassesFromState } from './breakpoints';
import {
  Component,
  observe as observeComponent,
  unobserve as unobserveComponent,
} from './resizeObserver';

const setBreakpoints = (observedComponent: Component, width: number) => {
  // If breakpoints are defined on the observed element's component,
  // use them. Otherwise use the defaults.
  const customBreakpoints = observedComponent._breakpoints;
  const breakpoints = customBreakpoints || defaultBreakpoints;

  // Set the matching breakpoints on the observed element.
  const newState: { [key: string]: boolean } = {};
  Object.keys(breakpoints).forEach(breakpoint => {
    const minWidth = breakpoints[breakpoint];
    newState[breakpoint] = width >= minWidth;
  });
  observedComponent.setState(newState);
};

export const observe = (component: Component) => {
  observeComponent(component, setBreakpoints);
};

export const unobserve = (component: Component) => {
  unobserveComponent(component);
};

export { getWidthClassesFromState };

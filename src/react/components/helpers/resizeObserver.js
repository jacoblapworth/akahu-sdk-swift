import ResizeObserver from 'resize-observer-polyfill';
import defaultBreakpoints, { widthClasses } from './breakpoints';

const entryComponentMap = new WeakMap();

const handleEntries = entries => {
	entries.forEach(entry => {
		// If breakpoints are defined on the observed element,
		// use them. Otherwise use the defaults.
		const hasCustomBreakpoints = entry.target.dataset.breakpoints !== undefined;
		const breakpoints = hasCustomBreakpoints ?
			JSON.parse(entry.target.dataset.breakpoints) :
			defaultBreakpoints;

		// Update the matching breakpoints on the observed element.
		const newState = {};
		const entryComponent = entryComponentMap.get(entry.target);
		Object.keys(breakpoints).forEach(breakpoint => {
			const minWidth = breakpoints[breakpoint];
			newState[breakpoint] = entry.contentRect.width >= minWidth;
		});
		entryComponent.setState(newState);
	});
};

// Create a single ResizeObserver instance to handle all
// container elements. The instance is created with a callback,
// which is invoked as soon as an element is observed as well
// as any time that element's size changes.
const ro = new ResizeObserver(handleEntries);

export const observe = component => {
	const element = component._area.current;
	entryComponentMap.set(element, component);
	ro && ro.observe(element);
};

export const unobserve = component => {
	const element = component._area.current;
	entryComponentMap.delete(element, component);
	ro && ro.unobserve(element);
};

export const getWidthClasses = stateObj => {
	if (!stateObj) return [];
	return Object.keys(widthClasses).map(width => stateObj[width] && widthClasses[width]);
};

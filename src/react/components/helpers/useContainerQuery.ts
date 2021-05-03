import { Breakpoints, getWidthClassesFromWidth, handleBreakpoint } from './breakpoints';
import useResizeObserver from './useResizeObserver';

export default function useContainerQuery<T extends HTMLElement>(customBreakpoints?: Breakpoints) {
  const { observedElementRef, contentRect } = useResizeObserver<T>();

  const { width } = contentRect;

  const isWidthAboveBreakpoint = breakpoint => {
    if (typeof width !== 'number') {
      // In many testing frameworks, a width will not be available.
      // Return `true` in order to default to full-width behaviour.
      return true;
    }
    return handleBreakpoint(width, breakpoint, customBreakpoints);
  };

  const getWidthClasses = () => getWidthClassesFromWidth(width);

  return { getWidthClasses, isWidthAboveBreakpoint, observedElementRef };
}

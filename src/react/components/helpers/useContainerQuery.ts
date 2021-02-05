import { Breakpoints, getWidthClassesFromWidth, handleBreakpoint } from './breakpoints';
import useResizeObserver from './useResizeObserver';

export default function useContainerQuery(customBreakpoints?: Breakpoints) {
  const { observedElementRef, contentRect } = useResizeObserver();

  const { width } = contentRect;

  const isWidthAboveBreakpoint = breakpoint =>
    typeof width === 'number' && handleBreakpoint(width, breakpoint, customBreakpoints);

  const getWidthClasses = () => getWidthClassesFromWidth(width);

  return { getWidthClasses, isWidthAboveBreakpoint, observedElementRef };
}

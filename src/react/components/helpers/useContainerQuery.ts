import { Breakpoints, getWidthClassesFromWidth, handleBreakpoint } from './breakpoints';
import useResizeObserver from './useResizeObserver';

export default function useContainerQuery<T extends HTMLElement>(
  customBreakpoints?: Breakpoints,
  useBorderBox?: boolean,
) {
  const { observedElementRef, contentRect } = useResizeObserver<T>();

  // `contentRect.width` uses the content box which excludes padding and borders.
  // `getBoundingClientRect().width` uses the border box which includes padding and borders.
  const width = useBorderBox
    ? observedElementRef.current?.getBoundingClientRect().width
    : contentRect.width;

  const isWidthAboveBreakpoint = (breakpoint: string) => {
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

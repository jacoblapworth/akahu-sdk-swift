import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import defaultBreakpoints from './breakpoints';

export default function useResizeObserver() {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(null);
  const observer = useRef(null);

  const observe = useCallback(() => {
    // Only observe one element here
    observer.current = new ResizeObserver(([e]) => setEntry(e));
    node && observer.current.observe(node);
  }, [node]);

  const unobserve = useCallback(() => {
    node && observer.current.unobserve(node);
  }, [node]);

  const handleBreakpoint = useCallback(
    breakpoint => {
      const { contentRect } = entry;
      return contentRect && contentRect.width < defaultBreakpoints[breakpoint];
    },
    [entry],
  );

  useLayoutEffect(() => {
    observe();
    return () => unobserve();
  }, [observe, unobserve]);

  return [setNode, handleBreakpoint, entry];
}

import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import defaultBreakpoints from './breakpoints';
import usePrevious from './usePrevious';

export default function useResizeObserver(defaultNode) {
  const [entry, setEntry] = useState({});
  const [node, setNode] = useState(defaultNode);
  const observer = useRef(null);
  const preRect = usePrevious(null);

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

  const handleSizeChange = useCallback(
    onSizeChange => {
      const { contentRect } = entry;
      if (contentRect && preRect) {
        const { width, height } = contentRect;
        const { width: preWidth, height: preHeight } = preRect;
        if (width !== preWidth || height !== preHeight) {
          onSizeChange();
        }
      }
    },
    [entry, preRect],
  );

  useLayoutEffect(() => {
    observe();
    return () => unobserve();
  }, [observe, unobserve]);

  return { ref: setNode, handleBreakpoint, entry, handleSizeChange };
}

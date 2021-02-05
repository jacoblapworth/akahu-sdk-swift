import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * `useResizeObserver` will observe an `HTMLElement` with a `ResizeObserver` and provide a
 * `contentRect` detailing the size of the element.
 *
 * Start by attaching the provided `observedElementRef` to an `HTMLElement`.
 *
 * To re-render a component on resize you can use the properties of the provided `contentRect` as
 * the dependencies of a `React.useLayoutEffect`.
 */
export default function useResizeObserver() {
  const observedElementRef = React.useRef<HTMLElement>(null);
  const [resizeObserverEntry, setResizeObserverEntry] = React.useState<ResizeObserverEntry>();
  const [resizeObserver] = React.useState(
    new ResizeObserver(entries => {
      const currentEntry = entries.find(entry => entry.target === observedElementRef.current);
      setResizeObserverEntry(currentEntry);
    }),
  );

  const observe = React.useCallback(() => {
    if (observedElementRef.current) {
      resizeObserver.observe(observedElementRef.current);
    }
  }, [resizeObserver]);

  const unobserve = React.useCallback(() => {
    if (observedElementRef.current) {
      resizeObserver.unobserve(observedElementRef.current);
    }
  }, [resizeObserver]);

  React.useLayoutEffect(() => {
    observe();
    return () => unobserve();
  }, [observedElementRef, observe, unobserve]);

  const contentRect = (resizeObserverEntry?.contentRect || {}) as Partial<DOMRectReadOnly>;

  return { observedElementRef, contentRect };
}

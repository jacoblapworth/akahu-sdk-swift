const combineRefs = <T = HTMLElement>(
  ...refs: Array<((instance: T) => void) | React.MutableRefObject<T> | null>
) => (element: T) => {
  refs.forEach(ref => {
    if (!ref) {
      return;
    }
    if (typeof ref === 'function') {
      ref(element);
    }
    if ('current' in ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = element;
    }
  });
};

export default combineRefs;

const combineRefs = <T = HTMLElement>(...refs: Array<React.Ref<T>>) => (element: T) => {
  refs.forEach(ref => {
    if (!ref) {
      return;
    }
    if (typeof ref === 'function') {
      ref(element);
    }
    if ('current' in ref) {
      // eslint-disable-next-line no-param-reassign
      (ref as React.MutableRefObject<T>).current = element;
    }
  });
};

export default combineRefs;

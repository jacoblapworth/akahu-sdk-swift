const combineRefs =
  <T extends HTMLElement = HTMLElement>(...refs: Array<React.Ref<T>>) =>
  (element: T | null) => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }
      if (typeof ref === 'function') {
        ref(element);
      }
      if ('current' in ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  };

export default combineRefs;

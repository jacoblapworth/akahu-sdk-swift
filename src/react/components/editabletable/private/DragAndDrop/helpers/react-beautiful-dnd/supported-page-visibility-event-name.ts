// This file is a TS version of
// https://github.com/atlassian/react-beautiful-dnd/blob/v13.1.0/src/view/use-sensor-marshal/sensors/util/supported-page-visibility-event-name.js

const supportedEventName = (() => {
  const base = 'visibilitychange';

  // Server side rendering
  if (typeof document === 'undefined') {
    return base;
  }

  // See https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  const candidates = [base, `ms${base}`, `webkit${base}`, `moz${base}`, `o${base}`];

  const supported: string | undefined = candidates.find(
    (eventName: string): boolean => `on${eventName}` in document,
  );

  return supported || base;
})();

export default supportedEventName;

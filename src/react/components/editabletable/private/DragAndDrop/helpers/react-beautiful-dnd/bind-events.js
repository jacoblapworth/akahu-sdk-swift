// This file is a non-Flow version of
// https://github.com/atlassian/react-beautiful-dnd/blob/v13.1.0/src/view/event-bindings/bind-events.js

function getOptions(shared, fromBinding) {
  return {
    ...shared,
    ...fromBinding,
  };
}

export default function bindEvents(el, bindings, sharedOptions) {
  const unbindings = bindings.map(binding => {
    const options = getOptions(sharedOptions, binding.options);

    el.addEventListener(binding.eventName, binding.fn, options);

    return function unbind() {
      el.removeEventListener(binding.eventName, binding.fn, options);
    };
  });

  // Return a function to unbind events
  return function unbindAll() {
    unbindings.forEach(unbind => {
      unbind();
    });
  };
}
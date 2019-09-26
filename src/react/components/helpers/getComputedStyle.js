const getComputedStyle = (element, prop) => {
  if (window.getComputedStyle && window.getComputedStyle(element, null)) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
  }
  return element.style[prop];
};

export default getComputedStyle;

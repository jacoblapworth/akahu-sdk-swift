const getComputedStyle = (element, prop) => {
	if (window.getComputedStyle && window.getComputedStyle(element, null)) {
		return window.getComputedStyle(element, null).getPropertyValue(prop);
	} else {
		return element.style[prop];
	}
};

export default getComputedStyle;

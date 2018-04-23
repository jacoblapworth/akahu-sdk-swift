export let ns = 'xui';

/**
 * Sets the CSS class namespace (prefix) that should be used
 * by components. Use this if you have set the $ns variable in SCSS to
 * something other than `xui`. This should be set BEFORE any components
 * have been imported.
 * @param {String} name
 */
export function setXUIClassNamespace(name) {
	if(typeof name !== 'string' || name.trim() === '') {
		throw new Error('XUI error: argument provided to setXUIClassNamespace must be a non-empty string')
	} else {
		ns = name;
	}
}

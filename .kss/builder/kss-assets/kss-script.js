/** 
 * Bootstrap a few runtime KSS things
 * 
 * This script initalises Pretty print
 * This script initalises the Jump to nav menu
 */

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	prettyPrint();

	const navSectionSelect = document.querySelector('#ds-nav-section');
	if (navSectionSelect) {
		navSectionSelect.addEventListener('change', e => {
			document.location.hash = navSectionSelect.value;
		});
	}
});

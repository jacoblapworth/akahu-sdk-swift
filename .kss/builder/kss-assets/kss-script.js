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

  buildSearch();

});

/**
 * Closes all the markup sample panels when another is opened
 * to prevent multiple panels being open simultaneously. Counterintuitively,
 * when `checked` is true, the panel is *not* displayed, and vice versa.
 * Overqualifying a selector and adding some guards here
 * because you can never be *really* sure.
 */
const showMarkupButtons = document.querySelectorAll('.ds-example-markuplink');
const showMarkupRadios = document.querySelectorAll('input[type="radio"].ds-input-example');

showMarkupButtons && showMarkupButtons.forEach(button => {
	button.addEventListener('click', e => {
		const associatedRadioId = e.target.attributes.for && e.target.attributes.for.value;
		const associatedRadio = document.getElementById(associatedRadioId);

		showMarkupRadios && showMarkupRadios.forEach(radio => {
			radio.checked = true;
		})

		if (associatedRadio) {
			associatedRadioId.checked = false;
		};
	});
});

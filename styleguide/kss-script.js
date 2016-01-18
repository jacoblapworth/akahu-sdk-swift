document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// For the slide-out menu on smaller screens
	document.querySelector('.kss-hamburger').addEventListener('click', function(event) {
		document.body.classList.toggle('kss-node-is-showing-sidebar');
		event.preventDefault();
	});
});

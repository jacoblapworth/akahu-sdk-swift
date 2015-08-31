document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var modalEl = document.getElementById('example-modal');
	var closeEl = document.querySelector('#example-modal .xui-modal-header-close');

	window.showExampleModal = function () {
		modalEl.classList.add('o-modal-opened');
	};

	window.hideExampleModal = function () {
		modalEl.classList.remove('o-modal-opened');
	};

	if (closeEl) {
		closeEl.addEventListener('click', window.hideExampleModal);
	}
});

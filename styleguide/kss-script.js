document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var modalEl = document.getElementById('example-modal');
	var closeEl = document.querySelector('#example-modal .xui-modal-header-close');
	var openedClass = 'xui-modal-opened';

	window.showExampleModal = function () {
		modalEl.classList.add(openedClass);
	};

	window.hideExampleModal = function () {
		modalEl.classList.remove(openedClass);
	};

	if (closeEl) {
		closeEl.addEventListener('click', window.hideExampleModal);
	}
});

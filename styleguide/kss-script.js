document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	var keys = {
		ESC: 27
	};

	var bodyEl = document.body;
	var maskEl = document.getElementById('example-modal');
	var modalEl = document.querySelector('#example-modal .xui-modal');
	var closeEl = document.querySelector('#example-modal .xui-modal--header-close');
	var openedClass = 'xui-modal-opened';

	function isModalOpen () {
		return maskEl.classList.contains(openedClass);
	}

	window.showExampleModal = function () {
		var e = window.event;

		if (e && e.type === 'click' && e.target.tagName === 'A') {
			e.stopPropagation();
			e.preventDefault();
		}

		maskEl.classList.add(openedClass);
	};

	window.hideExampleModal = function () {
		maskEl.classList.remove(openedClass);
	};

	if (closeEl) {
		closeEl.addEventListener('click', window.hideExampleModal);

		bodyEl.addEventListener('click', function (e) {
			if (!isModalOpen()) {
				return;
			}

			if(e.target === maskEl) {
				window.hideExampleModal();
			}
		});

		bodyEl.addEventListener('keyup', function (e) {
			if (!isModalOpen()) {
				return;
			}

			var key = e.key || e.keyCode;

			if (key === keys.ESC) {
				window.hideExampleModal();
			}
		});
	}


	// For the slide-out menu on smaller screens
	document.querySelector('.kss-hamburger').addEventListener('click', function(event) {
		document.body.classList.toggle('kss-node-is-showing-sidebar');
		event.preventDefault();
	});

});

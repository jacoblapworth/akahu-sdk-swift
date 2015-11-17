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
	var sidebar = document.getElementById('kss-sidebar');
	var content = document.getElementById('kss-main');
	var sectionHeader = document.querySelector('.kss-section--header');
	var toggle = document.querySelector('.kss-hamburger');
	toggle.addEventListener('click', function(event) {
		sidebar.classList.toggle('kss-sidebar-is-showing');
		content.classList.toggle('kss-main-is-showing-sidebar');
		sectionHeader.classList.toggle('kss-section--header-is-showing-sidebar');
		document.body.classList.toggle('kss-node-is-showing-sidebar');
		event.preventDefault();
	});

});

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

	function isInside (xy, box) {
		var x = xy.x;
		var y = xy.y;

		return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
	}

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

			var xy = { x: e.clientX, y: e.clientY };
			var clientRects = Array.prototype.slice.call(modalEl.getClientRects());

			var clicksInside = clientRects.filter(function (clientRect) {
				return isInside(xy, clientRect);
			});

			if (clicksInside.length === 0) {
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
});

document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	prettyPrint();
	const clipboard = new Clipboard('[data-copyHook]');

	const copiedToast = document.querySelector('#copiedToast');
	let timeOut;
	clipboard.on('success', e => {
		copiedToast.classList.remove('xui-transition-fadeout', 'xui-transition-speed-slow');
		window.clearTimeout(timeOut);
		timeOut = window.setTimeout(() => {
			copiedToast.classList.add('xui-transition-fadeout', 'xui-transition-speed-slow');
		}, 5000);
	});

	const copiedToastClose =  document.querySelector('#copiedToastClose');
	copiedToastClose.addEventListener('click', e => {
		window.clearTimeout(timeOut);
		copiedToast.classList.add('xui-transition-fadeout', 'xui-transition-speed-slow');
	});

	const navSectionSelect = document.querySelector('#ds-nav-section');
	navSectionSelect.addEventListener('change', e => {
		document.location.hash = navSectionSelect.value;
	});

	const spy = new ScrollSpy('#kss-node', {
		callback: e => {
			if (spy.isInView(navSectionSelect)) {
				navSectionSelect.value = "-1";
			};
		}
	});

	//Adding 'target="_blank"' to external refs so they can be accessed from iframes
	var isExternal = function(url) {
		var domain = function(url) {
			return url.replace(/https?:\/\//,'');
		};
		var xuiDocsURL = "github.dev.xero.com/pages/UXE/xui/";
		return (domain(url).substring(0,xuiDocsURL.length) !== xuiDocsURL);
	};

	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (isExternal(links[i].href)){
			links[i].setAttribute('target', '_parent');
		}
	}
});

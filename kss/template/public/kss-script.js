document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	// For the slide-out menu on smaller screens
	document.querySelector('.kss-hamburger').addEventListener('click', function(event) {
		document.body.classList.toggle('kss-node-is-showing-sidebar');
		event.preventDefault();
	});

	//Adding 'target="_blank"' to external refs so they can be accessed from iframes
	var isExternal = function(url) {
		var domain = function(url) {
			return url.replace(/https?:\/\//,'');
		};
		var xuiDocsURL = "github.dev.xero.com/pages/UXE/xui/";
		return (domain(url).substring(0,xuiDocsURL.length) !== xuiDocsURL);
	}
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		if (isExternal(links[i].href)){
			links[i].setAttribute('target', '_parent');
		}
	}
});

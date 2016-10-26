document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	prettyPrint();
	new Clipboard('.ds-copy-button');
	var spy = new ScrollSpy('#kss-node', {
		nav: '#ds-nav-section > li > a',
		className: 'xui-verticaltab-is-selected'
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

// =============================================================
// Default Example Settings
// =============================================================
var states = JSON.parse(localStorage.getItem(`xui-states`));

var setDefaultExampleStates = function() {
	// if this is the first time they have opened xui, then show both by default
	// initialise the states in localStorage
	if (!states) {
		states = {};
		states.default = 'example';
		localStorage.setItem('xui-states', JSON.stringify(states));
	}

	// Stores new state if user changes a specific sections layout view
	var markupOptions = document.querySelectorAll('[name^=a-]');
	markupOptions.forEach(function(option) {
		option.addEventListener('click', function (el) {
			// matches type and section id
			var matches = /(.*)\-(.*)/.exec(el.target.id);
			states[matches[2]] = matches[1];
			localStorage.setItem('xui-states', JSON.stringify(states));
		})
	});
	loadExamples();
};

function changeExampleView(el) {
	var type = el.attributes['data-statetype'].value;
	states = { default: type };
	localStorage.setItem('xui-states', JSON.stringify(states));
	loadExamples();
	window.scrollTo(0, document.body.scrollHeight);
}

var loadExamples = function() {
	const examples = document.querySelectorAll('[data-sectionid]');

	examples.forEach(function(example) {
		var sectionId = example.attributes['data-sectionid'].value;
		var state = states[sectionId] ? states[sectionId] : states.default;
		document.getElementById(state + '-' + sectionId).checked = true;
	});
};

setDefaultExampleStates();

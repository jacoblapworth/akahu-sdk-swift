var menuHeadings = Array.prototype.slice.call(document.querySelectorAll('[data-persistedmenu]'));
var storageKey = 'xui';
var states = JSON.parse(localStorage.getItem(`xui-states`));


document.addEventListener("DOMContentLoaded", function(event) {
	console.log("DOM fully loaded and parsed");

	menuHeadings.forEach(function (input) {
		input.addEventListener('click', function (e) {
			localStorage.setItem(`${storageKey}-${e.target.id}`, e.target.checked);
		});

		var checked = localStorage.getItem(`${storageKey}-${input.id}`);
		if (checked !== null) {
			input.checked = JSON.parse(checked);
		}
	});
	document.querySelectorAll('ul.xui-u-hidden')[0].classList.remove('xui-u-hidden');
	setDefaultExampleStates();
	loadExamples();
});

function setDefaultExampleStates() {
	// if this is the first time they have opened xui, then show both by default
	// initialise the states in localStorage
	if (!states) {
		states = {};
		states.default = 'example';
		localStorage.setItem(`xui-states`, JSON.stringify(states));
	}

	// Stores new state if user changes a specific sections layout view
	var markupOptions = document.querySelectorAll('[name^=a-]');
	markupOptions.forEach(option => {
		option.addEventListener('click', function (el) {
			// matches type and section id
			var matches = /(.*)\-(.*)/.exec(el.target.id);
			states[matches[2]] = matches[1];
			localStorage.setItem(`xui-states`, JSON.stringify(states));
		})
	});
}

function changeExampleView(el) {
	var type = el.attributes['data-statetype'].value;

	if (type !== states.default) {
		states = { default: type };
		localStorage.setItem(`xui-states`, JSON.stringify(states));
		loadExamples();
		window.scrollTo(0, document.body.scrollHeight);
	}
}

function loadExamples() {
	const examples = document.querySelectorAll('[data-sectionid]');

	examples.forEach(example => {
		var sectionId = example.attributes['data-sectionid'].value;
		var state = states[sectionId] ? states[sectionId] : states.default;
		document.getElementById(`${state}-${sectionId}`).checked = true;
	});
}


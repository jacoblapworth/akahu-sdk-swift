var storageKey = 'xui';

var menuHeadings = Array.prototype.slice.call(document.querySelectorAll('#navigation-primary [data-persistedmenu]'));

menuHeadings.forEach(function (input) {
	var checked = localStorage.getItem(`${storageKey}-${input.id}`);
	if (checked !== null) {
		input.checked = JSON.parse(checked);
	}
});

document.querySelector('#navigation-primary ul.xui-u-hidden').classList.remove('xui-u-hidden');

document.getElementById('navigation-primary').addEventListener('change', (e) => {
  if (e.target.dataset.hasOwnProperty('persistedmenu')) {
    localStorage.setItem(`${storageKey}-${e.target.id}`, e.target.checked);
  }
});

var states = JSON.parse(localStorage.getItem(`xui-states`));

document.addEventListener("DOMContentLoaded", function(event) {
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


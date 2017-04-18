var storageKey = 'xui';
var menuHeadings = Array.prototype.slice.call(document.querySelectorAll('#navigation-primary [data-persistedmenu]'));

menuHeadings.forEach(function (input) {
	var checked = localStorage.getItem(storageKey + '-' + input.id);
	if (checked !== null) {
		input.checked = JSON.parse(checked);
	}
});

document.querySelector('#navigation-primary ul.xui-u-hidden').classList.remove('xui-u-hidden');

document.getElementById('navigation-primary').addEventListener('change', function(e) {
  if (e.target.dataset.hasOwnProperty('persistedmenu')) {
    localStorage.setItem(storageKey + '-' + e.target.id, e.target.checked);
  }
});

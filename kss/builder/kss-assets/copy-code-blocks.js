function setInitialButtonStyling(button){
	button.setAttribute('class', 'clipboard-button xui-button code-copy');
	button.innerHTML = '<svg focusable="false" class="xui-icon xui-icon-inline"> <use xlink:href="#xui-icon-copy" role="presentation"/></svg>';
}

function setStandardButtonStyling(button){
	if (button.classList.contains('clipboard-button')) {
		button.innerHTML = '<svg focusable="false" class="xui-icon xui-icon-inline"> <use xlink:href="#xui-icon-copy" role="presentation"/></svg>';
	} else {
		button.innerHTML = '<svg focusable="false" class="xui-icon"> <use xlink:href="#xui-icon-copy" role="presentation"/></svg>';
	}
}

function setSuccessButtonStyling(button){
	if (button.classList.contains('clipboard-button')) {
		button.innerHTML = '<svg focusable="false" class="xui-icon xui-icon-inline"> <use xlink:href="#xui-icon-checkbox-check" role="presentation"/></svg>';
	} else {
		button.innerHTML = '<svg focusable="false" class="xui-icon"> <use xlink:href="#xui-icon-checkbox-check"></use></svg>';
	}
}

var pre = document.getElementsByTagName('code');
for (var i = 0; i < pre.length; i++) {
	var button = document.createElement('button');
	setInitialButtonStyling(button);
	pre[i].appendChild(button);
}

var clipboard = new Clipboard('.code-copy', {
	target: function(trigger) {return trigger.parentElement;}
});

clipboard.on('success',function(e){
	setSuccessButtonStyling(e.trigger);
	e.clearSelection();
	setTimeout(() => setStandardButtonStyling(e.trigger), 350);
});

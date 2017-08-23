function setStandardButtonStyling(button){
	button.setAttribute('class', 'clipboard-button xui-button');
	button.innerHTML = '<svg focusable="false" class="xui-icon xui-icon-inline"> <use xlink:href="#xui-icon-copy" role="presentation"/></svg>';
	button.setAttribute('xlink:href', '#xui-icon-copy');
}

function setSuccessButtonStyling(button){
	button.setAttribute('class', 'clipboard-button clipboard-button-success xui-button');
	button.innerHTML = '<svg focusable="false" class="xui-icon xui-icon-inline"> <use xlink:href="#xui-icon-checkbox-check" role="presentation"/></svg>';
	button.setAttribute('xlink:href', '#xui-icon-copy');
}

var pre = document.getElementsByTagName('code');
for (var i = 0; i < pre.length; i++) {
	var button = document.createElement('button');
	setStandardButtonStyling(button);
  pre[i].appendChild(button);
}

var clipboard = new Clipboard('.clipboard-button', {
	target: function(trigger) {return trigger.parentElement;}
});

clipboard.on('success',function(e){
	setSuccessButtonStyling(e.trigger);
	e.clearSelection();
	setTimeout(() => setStandardButtonStyling(e.trigger), 350);
});

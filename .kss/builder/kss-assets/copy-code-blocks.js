function setInitialButtonStyling(button) {
  button.setAttribute('class', 'clipboard-button hover-tooltip xui-button code-copy');
  button.setAttribute('title', 'Copy code');
  setStandardButtonStyling(button);
}

function setStandardButtonStyling(button) {
  button.innerHTML =
    '<svg focusable="false" class="xui-icon" role="presentation"> <use xlink:href="#xui-icon-copy"/></svg>';
}

function setSuccessButtonStyling(button) {
  button.innerHTML =
    '<svg focusable="false" class="xui-icon" role="presentation"> <use xlink:href="#xui-icon-checkbox-check"/></svg>';
}

var pre = document.getElementsByTagName('code');
for (var i = 0; i < pre.length; i++) {
  var button = document.createElement('button');
  setInitialButtonStyling(button);
  pre[i].appendChild(button);
}

var clipboard = new Clipboard('.code-copy', {
  target: function(trigger) {
    return trigger.parentElement;
  },
});

clipboard.on('success', function(e) {
  setSuccessButtonStyling(e.trigger);
  e.clearSelection();
  setTimeout(() => setStandardButtonStyling(e.trigger), 350);
});

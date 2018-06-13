<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-alerts-toast.html">Toasts in the XUI Documentation</a>
</div>

## Examples

### Default Layout

`XUIToast` is given a layout class by default with no actionable buttons. The close button is only added when a `onCloseClick` callback prop is added.

```
const onToastClose = () => {alert( 'Standard toast closed' )};

<div>
	<XUIToast message="System Message" />
	<XUIToast
		onCloseClick={onToastClose}
		message="Standard">
	</XUIToast>
</div>
```

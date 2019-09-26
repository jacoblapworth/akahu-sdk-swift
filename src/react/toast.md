<div class="xui-margin-vertical">
	<a href="../section-building-blocks-alerts-toast.html" isDocLink>Toasts in the XUI Documentation</a>
</div>

## Examples

### Default Layout

`XUIToast` is given a layout class by default with no actionable buttons. The close button is only added when a `onCloseClick` callback prop is added.

```jsx harmony
import XUIToast from './toast';

const onToastClose = () => {
  alert('Standard toast closed');
};

<div>
  <XUIToast message="System Message" />
  <XUIToast onCloseClick={onToastClose} message="Standard" />
</div>;
```

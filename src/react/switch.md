<div class="xui-margin-vertical">
	<a href="../section-components-controls-switch.html" isDocLink>Switch in the XUI Documentation</a>
</div>

`XUISwitch` uses an HTML checkbox under the hood and can be styled just as other control components.

## Example

```jsx harmony
import XUISwitch from '@xero/xui/react/switch';

<div>
  <h3>Enabled switch</h3>
  <XUISwitch hintMessage="The GST rate is 15%" isDefaultChecked>
    Include GST
  </XUISwitch>

  <h3>Disabled switch</h3>
  <XUISwitch isDisabled>Include notes</XUISwitch>
</div>;
```

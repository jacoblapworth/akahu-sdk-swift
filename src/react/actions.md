<div class="xui-margin-vertical">
	<a href="../section-components-controls-button.html#components-controls-button-12" isDocLink>Actions in the XUI Documentation</a>
</div>

Actions are used to wrap a selection of buttons (often two) and provide formatting. They can be embedded in a XUIModal, in a XUIPageHeader, in the footer of a XUIPanel, and other places. These are more generic than Banner Actions or Toast Actions.

#### Default action

A default action aligns a primary and secondary button to the right, with the primary as the rightmost.

```jsx harmony
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';

<XUIActions
  primaryAction={<XUIButton variant="main">Continue</XUIButton>}
  secondaryAction={<XUIButton>Cancel</XUIButton>}
/>;
```

#### Linear action

The linear variant aligns the primary button to the right and the secondary button to the left.

```jsx harmony
import XUIActions from '@xero/xui/react/actions';
import XUIButton from '@xero/xui/react/button';

<XUIActions
  isLinear
  primaryAction={<XUIButton variant="main">Next</XUIButton>}
  secondaryAction={<XUIButton>Previous</XUIButton>}
/>;
```

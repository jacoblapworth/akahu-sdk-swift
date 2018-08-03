
<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-button.html#building-blocks-controls-button-12" isDocLink>Actions in the XUI Documentation</a>
</div>

Actions are used to wrap a selection of buttons (often two) and provide formatting. They can be embedded in a XUIModal, in a XUIPageHeader, in the footer of a XUIPanel, and other places. These are more generic than Banner Actions or Toast Actions.

#### Default action

A default action aligns a primary and secondary button to the right, with the primary as the rightmost.

```
const XUIActions = require('../structural/XUIActions').default;
const XUIButton = require('../button/XUIButton').default;

<XUIActions
	primaryAction={<XUIButton key='one' variant="primary">Continue</XUIButton>}
	secondaryAction={<XUIButton key='two'>Cancel</XUIButton>}
/>
```

#### Linear action

The linear variant aligns the primary button to the right and the secondary button to the left.

```
const XUIActions = require('../structural/XUIActions').default;
const XUIButton = require('../button/XUIButton').default;

<XUIActions
	isLinear
	primaryAction={<XUIButton key='one' variant="primary">Next</XUIButton>}
	secondaryAction={<XUIButton key='two'>Previous</XUIButton>}
/>
```

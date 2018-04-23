<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-compounds-navigation-isolation-header.html">Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.
See the [implementation details section in the XUI docs](../section-building-blocks-isolation-header.html#compounds-navigation-isolation-header-4-1)
for behavioural aspects.

## Examples

```
const cross = require ('@xero/xui-icon/icons/cross').default;
const overflow = require ('@xero/xui-icon/icons/overflow').default;
const {XUIIsolationHeaderNavigation, XUIIsolationHeaderTitle, XUIIsolationHeaderSecondaryTitle, XUIIsolationHeaderActions} = require('./isolationheader');
const XUIIcon = require('./icon').default;
const XUIButton = require('./button').default;

<XUIIsolationHeader>
	<XUIIsolationHeaderNavigation>
		<XUIButton className="xui-margin-right-small" variant="icon-large">
			<XUIIcon path={cross} />
		</XUIButton>
		<XUIIsolationHeaderTitle>Main Title</XUIIsolationHeaderTitle>
		<XUIIsolationHeaderSecondaryTitle>Secondary Title</XUIIsolationHeaderSecondaryTitle>
	</XUIIsolationHeaderNavigation>
	<XUIIsolationHeaderActions>
		<XUIButton variant="icon-large">
			<XUIIcon path={overflow} />
		</XUIButton>
	</XUIIsolationHeaderActions>
</XUIIsolationHeader>
```

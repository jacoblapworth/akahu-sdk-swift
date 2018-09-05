<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-isolation-header.html" isDocLink>Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.
See the [implementation details section in the XUI docs](../section-compounds-navigation-isolation-header.html#compounds-navigation-isolation-header-4-1)
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
		<XUIButton className="xui-margin-right-small" variant="icon-large" aria-label="close">
			<XUIIcon icon={cross} />
		</XUIButton>
		<XUIIsolationHeaderTitle>Main Title</XUIIsolationHeaderTitle>
		<XUIIsolationHeaderSecondaryTitle>Secondary Title</XUIIsolationHeaderSecondaryTitle>
	</XUIIsolationHeaderNavigation>
	<XUIIsolationHeaderActions>
		<XUIButton variant="icon-large" aria-label="more options">
			<XUIIcon icon={overflow} />
		</XUIButton>
	</XUIIsolationHeaderActions>
</XUIIsolationHeader>
```

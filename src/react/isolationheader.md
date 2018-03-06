<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-isolation-header.html">Isolation Header in the XUI Documentation</a>
</div>

`XUIIsolationHeader` replaces the standard global header for tasks that are part of a focused workflow.

## Examples

```
const cross = require ('@xero/xui-icon/icons/cross').default;
const overflow = require ('@xero/xui-icon/icons/overflow').default;
const {XUIIsolationHeaderNavigation, XUIIsolationHeaderTitle, XUIIsolationHeaderSecondaryTitle, XUIIsolationHeaderActions} = require('./isolationheader');
const XUIIcon = require('./icon').default;
const XUIButton = require('./button').default;

<XUIIsolationHeader>
	<XUIIsolationHeaderNavigation>
		<XUIButton className="xui-margin-right-small" size="large" variant="icon">
			<XUIIcon path={cross} />
		</XUIButton>
		<XUIIsolationHeaderTitle>Main Title</XUIIsolationHeaderTitle>
		<XUIIsolationHeaderSecondaryTitle>Secondary Title</XUIIsolationHeaderSecondaryTitle>
	</XUIIsolationHeaderNavigation>
	<XUIIsolationHeaderActions>
		<XUIButton variant="icon">
			<XUIIcon path={overflow} />
		</XUIButton>
	</XUIIsolationHeaderActions>
</XUIIsolationHeader>

```

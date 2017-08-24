### XUI Docs

<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-banners.html#banner-2">Banners in the XUI Documentation</a></span>
	</div>
</div>

## Examples

### Default Layout

Standard banners are given a layout class by default and with no action buttons. The close button is only added when a `onCloseClick` callback prop is added.

Do not use banners for form validation; use inline validation messages instead.

```
const onBannerClose = () => {alert( 'Standard banner closed' )};

<div>
	<XUIBanner>
		<XUIBannerMessage>System Message</XUIBannerMessage>
	</XUIBanner>
	<XUIBanner sentiment="negative" onCloseClick={onBannerClose}>
		<XUIBannerMessage>Last night's bank statements did not come through</XUIBannerMessage>
	</XUIBanner>
</div>
```

<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-banner.html#banner-2">Banners in the XUI Documentation</a>
</div>

## Examples

### Default Layout

Standard banners are given a layout class by default and with no actionale buttons. The close button is only added when a `onCloseClick` callback prop is added.

```
const onBannerClose = () => {alert( 'Standard banner closed' )};

<div>
	<XUIBanner>
		<XUIBannerMessage qaHook="banner-example--message">System Message</XUIBannerMessage>
	</XUIBanner>
	<XUIBanner sentiment="negative" onCloseClick={onBannerClose}>
		<XUIBannerMessage>Negative sentiment with close button</XUIBannerMessage>
	</XUIBanner>
</div>
```

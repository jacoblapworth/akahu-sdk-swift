<div class="xui-margin-vertical">
	<a href="../section-building-blocks-alerts-banner.html" isDocLink>Banners in the XUI Documentation</a>
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

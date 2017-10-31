### Single Action

Single action banners provide an additional call to action inside the banner.
```
const onBannerClose = () => {alert( 'Single action banner closed' )};

<div>
	<XUIBanner qaHook="banner-example">
		<XUIBannerMessage qaHook="banner-example--message"> Standard </XUIBannerMessage>
		<XUIBannerAction href="#" qaHook="banner-example--action"> Action </XUIBannerAction>
	</XUIBanner>
	<XUIBanner onCloseClick={onBannerClose}>
		<XUIBannerMessage> Closable </XUIBannerMessage>
		<XUIBannerAction href="#"> Action </XUIBannerAction>
	</XUIBanner>
</div>
```
### Multi Action

Multi action banners can be wrapped in a `XUIBannerActions` component to provide more than one call to action. The message inside the `Banner` can also wrap larger descriptions, however this should be avoided if possible.
```
const onBannerClose = () => {alert( 'Multi action banner closed' )};;

<div>
	<XUIBanner>
		<XUIBannerMessage> Standard </XUIBannerMessage>
		<XUIBannerActions>
			<XUIBannerAction href="#"> Action One </XUIBannerAction>
			<XUIBannerAction href="#"> Action Two </XUIBannerAction>
		</XUIBannerActions>
	</XUIBanner>
	<XUIBanner onCloseClick={onBannerClose}>
		<XUIBannerMessage> Avoid long descriptions. However, it's helpful to know that text does wrap by default. </XUIBannerMessage>
		<XUIBannerActions>
			<XUIBannerAction href="#"> Action One </XUIBannerAction>
			<XUIBannerAction href="#"> Action Two </XUIBannerAction>
		</XUIBannerActions>
	</XUIBanner>
</div>
```

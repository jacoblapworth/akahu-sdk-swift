<div class="xui-margin-vertical">
	<a href="../section-components-alerts-banner.html" isDocLink>Banners in the XUI Documentation</a>
</div>

## Examples

### Default Layout

Standard banners are given a layout class by default and with no actionale buttons. The close button is only added when a `onCloseClick` callback prop is added.

```jsx harmony
import XUIBanner, { XUIBannerMessage } from '@xero/xui/react/banner';

const handleCloseClick = () => {
  console.log('onCloseClick');
};

<div>
  <XUIBanner>
    <XUIBannerMessage>
      We recommend that only your accountant or bookkeeper create journals, unless you have
      experience managing your general ledger.
    </XUIBannerMessage>
  </XUIBanner>
  <XUIBanner closeButtonLabel="Close" onCloseClick={handleCloseClick} sentiment="negative">
    <XUIBannerMessage>
      Data can't be loaded as there's a problem with your internet connection. Check your connection
      and try again.
    </XUIBannerMessage>
  </XUIBanner>
</div>;
```

### Single Action

Single action banners provide an additional call to action inside the banner.

```jsx harmony
import XUIBanner, {
  XUIBannerAction,
  XUIBannerActions,
  XUIBannerMessage
} from '@xero/xui/react/banner';

const handleCloseClick = () => {
  console.log('onCloseClick');
};

const handleClick = () => {
  console.log('onClick');
};

<div>
  <XUIBanner closeButtonLabel="Close" onCloseClick={handleCloseClick} sentiment="neutral">
    <XUIBannerMessage>Haven't received a notification yet?</XUIBannerMessage>
    <XUIBannerActions>
      <XUIBannerAction onClick={handleClick}>Resend notification</XUIBannerAction>
    </XUIBannerActions>
  </XUIBanner>
</div>;
```

### Multi Action

Multi action banners can be wrapped in a `XUIBannerActions` component to provide more than one call to action. The message inside the `Banner` can also wrap larger descriptions, however this should be avoided if possible.

```jsx harmony
import XUIBanner, {
  XUIBannerAction,
  XUIBannerActions,
  XUIBannerMessage
} from '@xero/xui/react/banner';

const handleCloseClick = () => {
  console.log('onCloseClick');
};

const handleClick = () => {
  console.log('onClick');
};

<div>
  <XUIBanner closeButtonLabel="Close" onCloseClick={handleCloseClick} sentiment="positive">
    <XUIBannerMessage>Puratana has approved your leave request</XUIBannerMessage>
    <XUIBannerActions>
      <XUIBannerAction onClick={handleClick}>View leave request</XUIBannerAction>
      <XUIBannerAction onClick={handleClick}>View all leave</XUIBannerAction>
    </XUIBannerActions>
  </XUIBanner>
</div>;
```

<div class="xui-margin-vertical">
	<a href="../section-components-alerts-introbanner.html" isDocLink>Intro banner in the XUI Documentation</a>
</div>

`XUIIntroBanner` is a component that sits beneath the page header or isolation header, and provides onboarding information about a product that's being used for the first time. It provides a space to teach users about what a product does and how they can use the features available.

The intro banner contains a dismiss button in the top right of the component, which can be connected to the “Getting started” switch under the “Help” menu in the global navigation. This allows the intro banner to be hidden and revealed as needed.

All intro banner components must be provided with `dismissButtonText` and `onDismiss` props in order to convey and enable the desired behaviour.

- If the intro banner is connected to the “Getting started” switch, a `dismissButtonText` prop value of `“Hide”` should be provided; otherwise this value should be `“Close”`.
- An `onDismiss` callback function is required to externally control the visible/dismissed state of the intro banner, as the component does not manage its own state.

## Examples

### Basic

The bare minimum intro banner component can be achieved by using `XUIIntroBanner` with a `XUIIntroBannerBody` child, along with props for the header title and dismiss button.

```js
import { XUIIntroBanner, XUIIntroBannerBody } from '@xero/xui/react/introbanner';

const dismiss = () => {
  window.alert('Dismiss');
};

<XUIIntroBanner
  dismissButtonText="Hide"
  headerTitle="Learn how to manage your inventory"
  onDismiss={dismiss}
>
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about <a href="#tracked-inventory">setting up tracked inventory</a> and{' '}
      <a href="#inventory-items">managing your inventory items</a>
    </p>
  </XUIIntroBannerBody>
</XUIIntroBanner>;
```

### With Actions

`XUIIntroBannerFooter` is an optional component that can be used to display action buttons for the intro banner, and will provide standard padding and responsive behaviour.

We recommend providing actions in the form of `XUIButton` components.

```js
import XUIButton from '@xero/xui/react/button';
import {
  XUIIntroBanner,
  XUIIntroBannerBody,
  XUIIntroBannerFooter
} from '@xero/xui/react/introbanner';
import external from '@xero/xui-icon/icons/external';

const dismiss = () => {
  window.alert('Dismiss');
};

const click = () => {
  window.alert('Link to external video');
};

const body = (
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about <a href="#tracked-inventory">setting up tracked inventory</a> and
      <a href="#inventory-items">managing your inventory items</a>
    </p>
  </XUIIntroBannerBody>
);

const footer = (
  <XUIIntroBannerFooter>
    <XUIButton onClick={click} rightIcon={external} size="small" variant="standard">
      Watch video on Xero TV
    </XUIButton>
  </XUIIntroBannerFooter>
);

<XUIIntroBanner
  dismissButtonText="Hide"
  footer={footer}
  headerTitle="Learn how to manage your inventory"
  onDismiss={dismiss}
>
  {body}
</XUIIntroBanner>;
```

### With Illustration

The intro banner can also include an illustration, which is displayed in the form of a `XUIIllustration` component. Provide a link to the illustration in the form of a `illustrationUrl` prop in order to compose this variant.

```js
import { XUIIntroBanner, XUIIntroBannerBody } from '@xero/xui/react/introbanner';

const dismiss = () => {
  window.alert('Dismiss');
};

const body = (
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about <a href="#tracked-inventory">setting up tracked inventory</a> and
      <a href="#inventory-items">managing your inventory items</a>
    </p>
  </XUIIntroBannerBody>
);

<XUIIntroBanner
  dismissButtonText="Hide"
  headerTitle="Learn how to manage your inventory"
  illustrationUrl="https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg"
  onDismiss={dismiss}
>
  {body}
</XUIIntroBanner>;
```

### With Video Illustration

A play button can be displayed on top of the illustration if an introduction video is available in the product, and can be used to trigger watching the video. In addition to providing an `illustrationUrl`, provide an `onVideoClick` prop, which will be called when the illustration is clicked, as well as a `videoButtonLabel` for accessibility purposes.

A `XUIIntroBannerFooter` component should also be provided containing a “Watch Video” button.

```js
import XUIButton from '@xero/xui/react/button';
import {
  XUIIntroBanner,
  XUIIntroBannerBody,
  XUIIntroBannerFooter
} from '@xero/xui/react/introbanner';
import videoIcon from '@xero/xui-icon/icons/social-youtube';

const dismiss = () => {
  window.alert('Dismiss');
};

const watchVideo = () => {
  window.alert('Watch video');
};

const body = (
  <XUIIntroBannerBody>
    <p>
      Inventory helps manage the items you regularly buy and sell. Use tracked inventory to monitor
      quantities on hand.
    </p>
    <p>
      Learn more about <a href="#tracked-inventory">setting up tracked inventory</a> and
      <a href="#inventory-items">managing your inventory items</a>
    </p>
  </XUIIntroBannerBody>
);

const footer = (
  <XUIIntroBannerFooter>
    <XUIButton onClick={watchVideo} leftIcon={videoIcon} size="small" variant="standard">
      Watch video [3:26]
    </XUIButton>
  </XUIIntroBannerFooter>
);

<XUIIntroBanner
  dismissButtonText="Hide"
  footer={footer}
  headerTitle="Learn how to manage your inventory"
  illustrationUrl="https://edge.xero.com/illustration/job-maker-01/job-maker-01.svg"
  onDismiss={dismiss}
  onVideoClick={watchVideo}
  videoButtonLabel="Watch video"
>
  {body}
</XUIIntroBanner>;
```

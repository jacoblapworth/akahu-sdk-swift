<div class="xui-margin-vertical">
	<a href="../section-fundamentals-illustrations.html" isDocLink>Illustrations in the XUI Documentation</a>
</div>

XUI provides a [centralised illustrations repository](https://github.dev.xero.com/UXE/illustrations/) to host illustrations, and a component to help teams implement illustrations consistently into products.

To find out more about creating or requesting illustrations [visit the Confluence page](https://confluence.teamxero.com/pages/viewpage.action?pageId=309631564).

For teams not using XUI to implement illustrations, try to mirror the functionality of the XUI component classes to ensure consistency if the illustrations are ever updated.

<div class="xui-u-flex xui-margin-bottom">
  <span>⚠️</span>
  <span class="xui-padding-left">The illustration creation and implementation process is currently in an experimentation phase, please touch base with the team if you have any questions or feedback.</span>
</div>

## Size

The `size` prop can be used to specify the size of your illustration. There are 3 presets available, `small`, `medium`, and `large`.

```jsx harmony
import XUIIllustration from '@xero/xui/react/illustration';

<XUIIllustration
  size="medium"
  src="https://edge.xero.com/illustration/scene/concierges-envelope-01/concierges-envelope-01.svg"
/>;
```

### Custom sizes

We recommend using one of the provided sizes, but you can use the `height` prop if you need to set a custom height. We recommend using a height between `160px` and `400px`.

If you need to adjust the padding on the illustration you can use the padding prop. This is usually used to remove the padding that comes with the default sizes or to add padding when using a custom height.

```jsx harmony
import XUIIllustration from '@xero/xui/react/illustration';

<XUIIllustration
  height={200}
  padding={20}
  src="https://edge.xero.com/illustration/scene/concierges-envelope-01/concierges-envelope-01.svg"
/>;
```

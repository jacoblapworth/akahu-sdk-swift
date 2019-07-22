<div class="xui-margin-vertical">
	<a href="../section-building-blocks-identifiers-loader.html" isDocLink>Loader in the XUI Documentation</a>
</div>

## Examples

### Default Layout

`XUILoader` is given a layout class by default. This is good for putting in large empty states, like panels, while loading data.

Use the required `ariaLabel` prop to provide information to screen readers.

```jsx harmony
import XUILoader from './loader';

<XUILoader ariaLabel="Loading" />;
```

### Disabled Layout

For more flexibility in styling and using Loaders in your application, set the prop `defaultLayout` to `false`.

```jsx harmony
import XUILoader from './loader';

<XUILoader ariaLabel="Loading" defaultLayout={false} />;
```

### Sizes

Apart from the `medium` size, Loaders can also be `small` or `xsmall`.

```jsx harmony
import XUILoader from './loader';

<XUILoader ariaLabel="Loading" size="medium" defaultLayout={false} />;
```

### Inverted

Loaders support inverted backgrounds

```jsx harmony
import XUILoader from './loader';
import ExampleContainer from './docs/ExampleContainer';

<ExampleContainer className="xui-padding-xsmall" isInverted>
  <XUILoader ariaLabel="Loading" isInverted />
</ExampleContainer>;
```

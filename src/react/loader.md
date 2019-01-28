<div class="xui-margin-vertical">
	<a href="../section-building-blocks-identifiers-loader.html" isDocLink>Loader in the XUI Documentation</a>
</div>

## Examples

### Default Layout

`XUILoader` is given a layout class by default. This is good for putting in large empty states, like panels, while loading data.

We recommend using the `ariaLabel` prop to provide information to screen readers.

```
<XUILoader ariaLabel="Loading more data" />
```
### Disabled Layout

For more flexibility in styling and using Loaders in your application, set the prop `defaultLayout` to `false`.

```
<XUILoader defaultLayout={false} />
```

### Sizes

Apart from the `medium` size, Loaders can also be `small` or `xsmall`.

```
<XUILoader size="medium" defaultLayout={false} />
```

### Inverted

Loaders support inverted backgrounds

```
const ExampleContainer = require('./docs/ExampleContainer').default;
<ExampleContainer className="xui-padding-xsmall" isInverted>
  <XUILoader isInverted={true} />
</ExampleContainer>
```


<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
		</svg>
	<a href="../section-building-blocks-identifiers-loader.html">Loader in the XUI Documentation</a>
</div>

## Examples

### Default Layout

`XUILoader` is given a layout class by default. This is good for putting in large empty states, like panels, while loading data.

We recommend using the `label` prop to provide information to screen readers.

```
<XUILoader label="Loading more data" />
```
### Disabled Layout

For more flexibility in styling and using Loaders in your application, set the prop `defaultLayout` to `false`.

```
<XUILoader defaultLayout={false} />
```

### Sizes

Apart from the `standard` size, Loaders can also be `small` or `large`.

```
<XUILoader size="large" defaultLayout={false} />
```

### Inverted

Loaders support inverted backgrounds

```
<div className="xui-background-grey-1">
  <XUILoader isInverted={true} />
</div>
```


<div class="xui-margin-vertical">
	<div>
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue"> <use xlink:href="#xui-icon-bookmark" role="presentation"/></svg>
		<span><a href="../section-loaders.html#loaders">Loader in the XUI Documentation</a></span>
	</div>
</div>

## Examples

By default, the Loader component is given a layout class. This is good for putting in large empty states, like panels, while loading data.

We recommend using the `label` prop to provide information to screen readers.

```
<XUILoader label="Loading more data" />
```

For more flexibility in using Loaders in your application, set `defaultLayout={false}`.

```
<XUILoader defaultLayout={false} />
```

### Sizes

Apart from the `standard` size, Loaders can be `small` or `large`.

```
<div>
<XUILoader className="xui-margin-bottom" size="small" defaultLayout={false} />
<XUILoader className="xui-margin-bottom" defaultLayout={false} />
<XUILoader size="large" defaultLayout={false} />
</div>
```
